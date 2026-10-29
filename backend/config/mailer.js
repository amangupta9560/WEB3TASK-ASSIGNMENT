const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"YouTube Watch Party" <${process.env.EMAIL_USER || 'no-reply@watchparty.com'}>`,
      to,
      subject,
      text: text || '',
      html: html || `<p>${text}</p>`
    });

    console.log(`[Email Sent] Message ID: ${info.messageId} to ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.warn(`[Email Delivery Notice] Could not deliver email directly (${error.message}). Logging message content for development/demo:`);
    console.log(`[Pending Email To: ${to}] Subject: ${subject}`);
    return {
      success: false,
      error: error.message,
      simulated: true,
      preview: { to, subject, html }
    };
  }
};

module.exports = {
  transporter,
  sendEmail
};
