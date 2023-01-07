import nodemailer from "nodemailer";

export const sendEmail = ({ from, to, subject, content, callback }) => {
  const transport = nodemailer.createTransport({
    // host: "",
    service: "gmail",
    // port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    to: to,
    from: from,
    subject: subject,
    html: content,
  };
  transport.sendMail(mailOptions, async (error, response) => {
    if (error) {
      console.log(error);
      throw new Error(error);
    } else {
      console.log("email sent !");

      if (callback !== undefined || callback !== null) callback();
    }
  });
};
