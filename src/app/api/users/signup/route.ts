import bcryptjs from "bcryptjs";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/helpers/mailer";

connectDB();

const POST = async (request: NextRequest) => {
  try {
    const { username, email, password } = await request.json();
    const alreadyUser = await User.findOne({ $or: [{ email }, { username }] });
    if (alreadyUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const { password: _, ...userWithoutPassword } = savedUser._doc;
    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" + error.message },
      { status: 500 }
    );
  }
};
export { POST };
