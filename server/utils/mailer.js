/**
 * mailer.js — Nodemailer transport singleton.
 *
 * Reads SMTP config from environment variables.
 * Falls back to Ethereal (fake SMTP) in development when no SMTP credentials
 * are set, so you can test email flows without a real mail server.
 *
 * Environment variables needed (set in server/.env):
 *   SMTP_HOST         e.g. smtp.gmail.com | mail.privateemail.com
 *   SMTP_PORT         587 (STARTTLS) or 465 (SSL)
 *   SMTP_SECURE       "true" for port 465, omit or "false" for 587
 *   SMTP_USER         your full email address
 *   SMTP_PASS         your email password or app-specific password
 *   MAIL_FROM         "Anther Consulting <info@antherconsulting.com.ng>"
 *   CONTACT_RECIPIENT info@antherconsulting.com.ng
 */

import nodemailer from 'nodemailer'

let _transporter = null

async function createTransporter() {
  // ── Production: use real SMTP credentials ──────────────────────────────────
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   parseInt(process.env.SMTP_PORT ?? '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true = port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  // ── Development: Ethereal fake SMTP (preview URL logged to console) ────────
  console.warn('[Mailer] No SMTP credentials found — using Ethereal test account.')
  console.warn('[Mailer] Sent emails will NOT be delivered; preview URLs will be logged.')
  const testAccount = await nodemailer.createTestAccount()
  return nodemailer.createTransport({
    host:   'smtp.ethereal.email',
    port:   587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })
}

/**
 * Get (or lazily create) the singleton transporter.
 */
export async function getTransporter() {
  if (!_transporter) {
    _transporter = await createTransporter()
  }
  return _transporter
}

/**
 * sendMail — thin wrapper around transporter.sendMail().
 * Logs the Ethereal preview URL in development.
 *
 * @param {import('nodemailer').SendMailOptions} options
 */
export async function sendMail(options) {
  const transporter = await getTransporter()
  const from = process.env.MAIL_FROM ?? 'Anther Consulting <info@antherconsulting.com.ng>'
  const info = await transporter.sendMail({ from, ...options })

  // Log preview URL when using Ethereal
  const previewUrl = nodemailer.getTestMessageUrl(info)
  if (previewUrl) {
    console.log(`[Mailer] Preview URL: ${previewUrl}`)
  }

  return info
}
