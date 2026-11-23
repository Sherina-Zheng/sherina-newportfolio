import { Resend } from 'resend'

export async function POST(req) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  // escape visitor input before putting it into the HTML email
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const safe = { name: esc(name), email: esc(email), message: esc(message) }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',   // change to your verified domain later
    to: 'zhengsherina@gmail.com',
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${safe.name} &lt;${safe.email}&gt;</p>
      <p><strong>Message:</strong></p>
      <p>${safe.message.replace(/\n/g, '<br/>')}</p>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
