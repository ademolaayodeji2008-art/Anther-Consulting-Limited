import Subscriber from '../models/Subscriber.js'
import { sendMail } from '../utils/mailer.js'
import { newsletterWelcome } from '../utils/emailTemplates.js'

// POST /api/newsletter
export async function subscribe(req, res) {
  try {
    const { email } = req.body
    if (!email || typeof email !== 'string')
      return res.status(400).json({ error: 'A valid email address is required.' })

    const normalised = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalised))
      return res.status(400).json({ error: 'Invalid email address format.' })

    const existing = await Subscriber.findOne({ email: normalised })
    if (existing)
      return res.status(200).json({ success: true, message: 'Thank you for subscribing to the Anther Consulting newsletter.' })

    await Subscriber.create({ email: normalised })
    console.log(`[Newsletter] New subscriber: ${normalised}`)

    sendMail({ to: normalised, ...newsletterWelcome({ email: normalised }) })
      .catch((e) => console.error('[Mailer] Welcome failed:', e.message))

    return res.status(200).json({ success: true, message: 'Thank you for subscribing to the Anther Consulting newsletter.' })
  } catch (err) {
    console.error('[Newsletter] Error:', err)
    return res.status(500).json({ error: 'Internal server error. Please try again later.' })
  }
}
