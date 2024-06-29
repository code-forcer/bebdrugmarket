import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `"Pharmacy Marketplace" <${process.env.GMAIL_USER}>`,
    to: to,
    subject: subject,
    text: text,
  });

  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
