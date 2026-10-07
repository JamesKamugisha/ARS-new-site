import { MAX_RESUME_BYTES, json, rowsToHtml, sendEmail } from './_lib/email.js'

const ROLES = { dsp: 'Direct Support Professional (DSP)', hm: 'House Manager' }
const REQUIRED = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'role', 'about']

export async function POST(request) {
  let data
  try {
    data = await request.formData()
  } catch {
    return json(400, { error: 'Invalid form data.' })
  }

  const field = (name) => String(data.get(name) ?? '').trim()
  const missing = REQUIRED.filter((name) => !field(name))
  if (missing.length > 0) return json(400, { error: 'Please fill in all required fields.' })
  if (!field('email').includes('@')) return json(400, { error: 'Please enter a valid email.' })

  const attachments = []
  const resume = data.get('resume')
  if (resume && typeof resume === 'object' && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) return json(400, { error: 'Resume must be 4MB or smaller.' })
    const content = Buffer.from(await resume.arrayBuffer()).toString('base64')
    attachments.push({ filename: resume.name || 'resume', content })
  }

  const name = `${field('firstName')} ${field('lastName')}`
  const role = ROLES[field('role')] || field('role')
  const html = rowsToHtml(`New job application: ${name}`, [
    ['Name', name],
    ['Email', field('email')],
    ['Phone', field('phone')],
    ['Address', `${field('address')}, ${field('city')}, ${field('state')} ${field('zip')}`],
    ['Role', role],
    ['Certifications', data.getAll('certifications').join(', ')],
    ['Available days', data.getAll('days').join(', ')],
    ['About', field('about')],
    ['Resume', attachments.length ? 'Attached' : 'Not provided'],
  ])

  try {
    await sendEmail({
      subject: `Job application – ${role} – ${name}`,
      html,
      replyTo: field('email'),
      attachments,
    })
  } catch {
    return json(500, { error: 'We could not submit your application. Please try again or call us.' })
  }
  return json(200, { ok: true })
}
