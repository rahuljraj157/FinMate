import nodemailer from 'nodemailer';
export const sendEmergencyMail = async (toEmail: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: '⚠️ Emergency Budget Alert',
    text: `You have reached 90% of your budget. Please review your expenses immediately.`,
  };

  await transporter.sendMail(mailOptions);
};
