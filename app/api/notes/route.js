// In-memory store shared across all requests on the same server instance.
// Notes persist while the dev/prod server is running and are visible to all visitors.
const notes = []

export async function GET() {
  return Response.json(notes.slice(-40).reverse())
}

export async function POST(req) {
  const { text } = await req.json()
  if (!text || typeof text !== 'string') return new Response('Bad request', { status: 400 })
  const trimmed = text.trim().slice(0, 160)
  if (!trimmed) return new Response('Bad request', { status: 400 })
  notes.push({ text: trimmed, ts: Date.now() })
  return Response.json({ ok: true })
}
