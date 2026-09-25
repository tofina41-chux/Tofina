import nodemailer from 'nodemailer';

// Basic email format validation
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

export async function POST(request) {
  try {
    // ── 1. Config guard ────────────────────────────────────────────────────
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Contact form misconfigured: EMAIL_USER or EMAIL_PASS is not set on this deployment.');
      return new Response(
        JSON.stringify({ success: false, error: 'Email is not configured on the server yet.' }),
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, message, _honeypot } = body || {};

    // ── 2. Honeypot check (bots fill hidden fields; humans leave them blank) ─
    if (_honeypot) {
      // Silently drop the request — don't tell bots they were caught
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200 }
      );
    }

    // ── 3. Input validation ────────────────────────────────────────────────
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name is required.' }),
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'A valid email address is required.' }),
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 1) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message is required.' }),
        { status: 400 }
      );
    }

    // ── 4. Transport ───────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ── 5. Mail options ────────────────────────────────────────────────────
    // FIX: `from` is always our authenticated address → no more bounces.
    // `replyTo` lets us click Reply in Gmail and reach the real visitor.
    const mailOptions = {
      from: `Tofina Sparkle Contact <${process.env.EMAIL_USER}>`,
      replyTo: `${name.trim()} <${email}>`,
      to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
      subject: `New message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email}\n\n${message.trim()}`,
      html: `
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p>${message.trim().replace(/\n/g, '<br />')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send message. Please try again.' }),
      { status: 500 }
    );
  }
}
