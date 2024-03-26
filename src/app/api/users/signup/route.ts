import bcryptjs from "bcryptjs";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/helpers/mailer";

connectDB();

const POST = async (request: NextRequest) => {
  try {
    const { username, email, password } = await request.json();
    const user = await User.findOne({ email });
    if (user) {
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
    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json(
      { message: "User created successfully", success: true, savedUser },
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
