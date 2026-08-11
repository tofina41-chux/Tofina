import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Contact form misconfigured: EMAIL_USER or EMAIL_PASS is not set on this deployment.');
      return new Response(
        JSON.stringify({ success: false, error: 'Email is not configured on the server yet.' }),
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name, email, and message are all required.' }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `${name} <${email}>`,
      to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
      subject: `Contact form: ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} &lt;${email}&gt;</p>`
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Contact form send failed:', err?.message || err);
    return new Response(JSON.stringify({ success: false, error: String(err?.message || err) }), { status: 500 });
  }
}
