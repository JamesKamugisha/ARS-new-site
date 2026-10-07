import { json, rowsToHtml, sendEmail } from './_lib/email.js'

const SUBJECTS = { general: 'General Inquiry', care: 'Care Services', employment: 'Employment', other: 'Other' }

export async function POST(request) {
  let data
  try {
    data = await request.json()
  } catch {
    return json(400, { error: 'Invalid request.' })
  }

  const field = (name) => String(data?.[name] ?? '').trim()
  if (['name', 'email', 'phone', 'subject', 'message'].some((n) => !field(n))) {
    return json(400, { error: 'Please fill in all required fields.' })
  }
  if (!field('email').includes('@')) return json(400, { error: 'Please enter a valid email.' })

  const subject = SUBJECTS[field('subject')] || field('subject')
  const html = rowsToHtml(`New contact message: ${subject}`, [
    ['Name', field('name')],
    ['Email', field('email')],
    ['Phone', field('phone')],
    ['Subject', subject],
    ['Message', field('message')],
  ])

  try {
    await sendEmail({ subject: `Website contact – ${subject} – ${field('name')}`, html, replyTo: field('email') })
  } catch {
    return json(500, { error: 'We could not send your message. Please try again or call us.' })
  }
  return json(200, { ok: true })
}
