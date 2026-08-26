/**
 * emailTemplates.js — HTML + plain-text email templates.
 *
 * Two templates:
 *   contactNotification  — sent to the firm when a contact form is submitted
 *   contactAutoReply     — sent to the person who submitted the form
 *   newsletterWelcome    — sent to a new newsletter subscriber
 */

const BRAND_BLUE  = '#1414F0'
const BRAND_NAVY  = '#0A1A3C'
const BRAND_GRAY  = '#4B5563'

// ── Shared wrapper ────────────────────────────────────────────────────────────
function htmlWrapper(bodyContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Anther Consulting Limited</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:${BRAND_BLUE};padding:24px 32px;">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:2px;">
              ANTHER CONSULTING LIMITED
            </p>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:11px;letter-spacing:1px;">
              ACCOUNTING · TAX · BUSINESS CONSULTING
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            ${bodyContent}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;text-align:center;">
            <p style="margin:0;color:${BRAND_GRAY};font-size:12px;">
              Anther Consulting Limited &nbsp;|&nbsp;
              <a href="mailto:info@antherconsulting.com.ng" style="color:${BRAND_BLUE};text-decoration:none;">
                info@antherconsulting.com.ng
              </a>
            </p>
            <p style="margin:6px 0 0;color:#9ca3af;font-size:11px;">
              Lagos · Ibadan · Abuja, Nigeria
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── 1. Contact notification (to the firm) ────────────────────────────────────
export function contactNotification({ name, email, phone, subject, message, id }) {
  const html = htmlWrapper(`
    <h2 style="margin:0 0 4px;color:${BRAND_NAVY};font-size:20px;">New Contact Form Submission</h2>
    <p style="margin:0 0 24px;color:${BRAND_GRAY};font-size:13px;">Received via the website contact form.</p>

    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
      ${row('Reference', `#${id}`)}
      ${row('Name',    name)}
      ${row('Email',   `<a href="mailto:${email}" style="color:${BRAND_BLUE};">${email}</a>`)}
      ${row('Phone',   phone || '—')}
      ${row('Subject', subject)}
    </table>

    <div style="margin-top:24px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:${BRAND_NAVY};">Message:</p>
      <div style="background:#f9fafb;border-left:4px solid ${BRAND_BLUE};padding:16px;border-radius:4px;font-size:14px;color:${BRAND_GRAY};line-height:1.6;white-space:pre-wrap;">${escHtml(message)}</div>
    </div>

    <div style="margin-top:24px;">
      <a href="mailto:${email}?subject=Re: ${escHtml(subject)}"
         style="display:inline-block;background:${BRAND_BLUE};color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:bold;">
        Reply to ${escHtml(name)} →
      </a>
    </div>
  `)

  const text = `New contact form submission\n\nRef: #${id}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '—'}\nSubject: ${subject}\n\nMessage:\n${message}`

  return { html, text, subject: `[Contact Form] ${subject} — from ${name}` }
}

// ── 2. Contact auto-reply (to the sender) ─────────────────────────────────────
export function contactAutoReply({ name, subject }) {
  const html = htmlWrapper(`
    <h2 style="margin:0 0 16px;color:${BRAND_NAVY};font-size:20px;">Thank you, ${escHtml(name)}!</h2>
    <p style="color:${BRAND_GRAY};font-size:14px;line-height:1.7;margin:0 0 16px;">
      We have received your message regarding <strong>"${escHtml(subject)}"</strong> and one of our
      team members will be in touch with you shortly.
    </p>
    <p style="color:${BRAND_GRAY};font-size:14px;line-height:1.7;margin:0 0 16px;">
      If your enquiry is urgent, you can also reach us directly:
    </p>
    <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row('Phone',  '+234 8034-982-305 / +234 7062-190-613')}
      ${row('Email',  '<a href="mailto:info@antherconsulting.com.ng" style="color:' + BRAND_BLUE + ';">info@antherconsulting.com.ng</a>')}
      ${row('Hours',  'Monday – Friday, 8:00 am – 5:00 pm WAT')}
    </table>
    <p style="color:${BRAND_GRAY};font-size:14px;line-height:1.7;margin:0;">
      Warm regards,<br/>
      <strong style="color:${BRAND_NAVY};">The Anther Consulting Team</strong>
    </p>
  `)

  const text = `Hi ${name},\n\nThank you for reaching out. We have received your message and will be in touch shortly.\n\nFor urgent enquiries: +234 8034-982-305 | info@antherconsulting.com.ng\n\nWarm regards,\nAnther Consulting Limited`

  return { html, text, subject: `We received your message — ${subject}` }
}

// ── 3. Newsletter welcome ─────────────────────────────────────────────────────
export function newsletterWelcome({ email }) {
  const html = htmlWrapper(`
    <h2 style="margin:0 0 16px;color:${BRAND_NAVY};font-size:20px;">Welcome to our Newsletter!</h2>
    <p style="color:${BRAND_GRAY};font-size:14px;line-height:1.7;margin:0 0 16px;">
      Thank you for subscribing to the Anther Consulting Limited newsletter.
      You will receive updates on tax regulations, accounting best practices,
      business insights, and news from our firm.
    </p>
    <p style="color:${BRAND_GRAY};font-size:14px;line-height:1.7;margin:0 0 24px;">
      We promise to keep it relevant and concise — no spam, ever.
    </p>
    <p style="color:${BRAND_GRAY};font-size:14px;line-height:1.7;margin:0;">
      Warm regards,<br/>
      <strong style="color:${BRAND_NAVY};">The Anther Consulting Team</strong>
    </p>
  `)

  const text = `Welcome to the Anther Consulting newsletter!\n\nThank you for subscribing (${email}). You will receive updates on tax, accounting, and business topics from our team.\n\nWarm regards,\nAnther Consulting Limited`

  return { html, text, subject: 'Welcome to the Anther Consulting Newsletter' }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function row(label, value) {
  return `<tr>
    <td style="padding:8px 12px 8px 0;font-size:13px;font-weight:bold;color:${BRAND_NAVY};white-space:nowrap;vertical-align:top;border-bottom:1px solid #f3f4f6;">${label}</td>
    <td style="padding:8px 0;font-size:13px;color:${BRAND_GRAY};border-bottom:1px solid #f3f4f6;">${value}</td>
  </tr>`
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
