// Shared helpers for the form endpoints. Files in folders starting with "_"
// are not exposed as routes by Vercel.

export const MAX_RESUME_BYTES = 4 * 1024 * 1024 // Vercel caps request bodies at 4.5MB

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function rowsToHtml(title, rows) {
  const body = rows
    .map(([label, value]) =>
      `<tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top">${escapeHtml(label)}</td>` +
      `<td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(value) || '—'}</td></tr>`)
    .join('')
  return `<h2>${escapeHtml(title)}</h2><table style="border-collapse:collapse;font-family:sans-serif">${body}</table>`
}

export function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function sendEmail({ subject, html, replyTo, attachments }) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.MAIL_TO
  if (!apiKey || !to) {
    console.error('Missing RESEND_API_KEY or MAIL_TO environment variable')
    throw new Error('Email is not configured')
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || 'ARS Website <onboarding@resend.dev>',
      to: to.split(',').map((s) => s.trim()).filter(Boolean),
      reply_to: replyTo,
      subject,
      html,
      attachments,
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    throw new Error('Email send failed')
  }
}
