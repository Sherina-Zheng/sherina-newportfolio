import { Redis } from '@upstash/redis'

// Notes are saved in Upstash Redis (connected through Vercel Storage), so they survive
// restarts and redeploys and every visitor sees the same wall.
// Vercel's Upstash integration names the keys KV_REST_API_*; Upstash's own docs use UPSTASH_REDIS_REST_*.
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const redis = url && token ? new Redis({ url, token }) : null

// Without those keys (e.g. `npm run dev` on your Mac) notes fall back to memory, like before.
const local = []

const KEY = 'wall:notes'
const MAX = 40            // newest notes kept on the wall
const COOLDOWN = 30       // seconds between posts from the same visitor

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    if (!redis) return Response.json(local.slice(0, MAX))
    const notes = await redis.lrange(KEY, 0, MAX - 1) // newest first
    return Response.json(notes)
  } catch (err) {
    console.error('notes GET failed:', err)
    return Response.json([])
  }
}

export async function POST(req) {
  let body
  try { body = await req.json() } catch { return new Response('Bad request', { status: 400 }) }
  const { text } = body || {}
  if (!text || typeof text !== 'string') return new Response('Bad request', { status: 400 })
  const trimmed = text.replace(/\s+/g, ' ').trim().slice(0, 160)
  if (!trimmed) return new Response('Bad request', { status: 400 })

  // basic spam guard: no links
  if (/(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|xyz|ru|cn|top|info)\b)/i.test(trimmed)) {
    return Response.json({ error: 'Links are not allowed on the wall.' }, { status: 400 })
  }

  const note = { text: trimmed, ts: Date.now() }
  try {
    if (!redis) {
      local.unshift(note); local.length = Math.min(local.length, MAX)
      return Response.json({ ok: true })
    }
    // basic spam guard: one post per visitor every 30 seconds
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
    const fresh = await redis.set(`wall:cooldown:${ip}`, 1, { nx: true, ex: COOLDOWN })
    if (!fresh) return Response.json({ error: 'Slow down a little, then try again.' }, { status: 429 })

    await redis.lpush(KEY, note)
    await redis.ltrim(KEY, 0, MAX - 1)
    return Response.json({ ok: true })
  } catch (err) {
    console.error('notes POST failed:', err)
    return Response.json({ error: 'Could not save the note.' }, { status: 500 })
  }
}
