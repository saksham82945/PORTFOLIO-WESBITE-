import nodemailer from 'nodemailer';
import Message from '../models/Message.js';
import { escapeHtml } from '../utils/escapeHtml.js';

export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    // Save to DB — only allowed fields
    const msg = await Message.create({ name, email, subject, message });

    // Escape user inputs before inserting into HTML email
    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // Send email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] ${safeSubject}`,
      html: `
        <h2>New message from ${safeName}</h2>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    res.status(201).json({ message: 'Message sent to the stars! 🚀', id: msg._id });
  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
