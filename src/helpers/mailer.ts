import nodemailer from "nodemailer";
const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });
    const mailoptions = {
      from: "admin@nitish.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
      html: "<h1>Hello </h1>",
    };
    const mailResponse = await transporter.sendMail(mailoptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export default sendEmail;
