import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      // TODO: replace 'user' and 'pass' values from <https://forwardemail.net>
      user: 'subasroy46@gmail.com',
      pass: 'xvai bcxa eucs potd',
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'subasroy46@gmail.com', // sender address
    to, // list of receivers
    subject: 'Change Your Password!', // Subject line
    text: 'Reset your password within 10 munites!', // plain text body
    html, // html body
  });
};
