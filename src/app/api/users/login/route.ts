import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();
const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your Credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: process.env.TOKEN_EXPIRES_TIME!,
    });
    const reponse = NextResponse.json({
      message: "Logged In Success",
      success: true,
    });
    reponse.cookies.set("token", token, {
      httpOnly: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
export { POST };
