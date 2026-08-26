import Contact from '../models/Contact.js'
import { sendMail } from '../utils/mailer.js'
import { contactNotification, contactAutoReply } from '../utils/emailTemplates.js'

// POST /api/contact
export async function submitContact(req, res) {
  try {
    const { name, email, phone, subject, message } = req.body

    const missing = []
    if (!name?.trim())    missing.push('name')
    if (!email?.trim())   missing.push('email')
    if (!subject?.trim()) missing.push('subject')
    if (!message?.trim()) missing.push('message')
    if (missing.length)
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}.` })

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return res.status(400).json({ error: 'Invalid email address format.' })

    const entry = await Contact.create({
      name: name.trim(), email: email.trim().toLowerCase(),
      phone: phone?.trim() ?? '', subject: subject.trim(), message: message.trim(),
    })

    console.log(`[Contact] #${entry._id} from ${entry.email} — "${entry.subject}"`)

    const recipient = process.env.CONTACT_RECIPIENT ?? 'info@antherconsulting.com.ng'
    Promise.all([
      sendMail({ to: recipient, ...contactNotification({ ...entry.toObject(), id: entry._id }) })
        .catch((e) => console.error('[Mailer] Notification failed:', e.message)),
      sendMail({ to: entry.email, ...contactAutoReply({ name: entry.name, subject: entry.subject }) })
        .catch((e) => console.error('[Mailer] Auto-reply failed:', e.message)),
    ])

    return res.status(200).json({ success: true, message: 'Thank you for reaching out. We will be in touch shortly.' })
  } catch (err) {
    console.error('[Contact] Error:', err)
    return res.status(500).json({ error: 'Internal server error. Please try again later.' })
  }
}
