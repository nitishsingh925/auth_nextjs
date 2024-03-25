import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiration: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiration: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST!,
      port: parseInt(process.env.MAILTRAP_PORT!),
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    const mailoptions = {
      from: "admin@nitish.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}">hear</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser <br>${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}</p>`,
    };
    const mailResponse = await transport.sendMail(mailoptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export default sendEmail;
