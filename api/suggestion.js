import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'dmytro.mysak@gmail.com', pass: process.env.EMAIL_API_KEY },
});

export default async function handler(req, res) {
  try {
    const {
      body: { from, text },
    } = req;
    console.log({ from, text });

    const result = await await transporter.sendMail({
      from: 'dmytro.mysak@gmail.com',
      to: 'dmytro.mysak@gmail.com',
      subject: 'FF24++ questions',
      html: `<p>From: <strong>${from}</strong>!</p> <p>Text: ${text}</p>`,
    });
    const hasErrors = result.rejected.length;

    res.status(hasErrors ? 400 : 200);
    return res.send(result.response);
  } catch (e) {
    console.log(e);
    res.status(500);

    return res.send('Віу-віу-віу');
  }
}
