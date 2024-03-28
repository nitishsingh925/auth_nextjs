import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connectDB();

const POST = async (request: NextRequest) => {
  const userId = await getDataFromToken(request);
  const user = await User.findById({ _id: userId }).select("-password");
  return NextResponse.json({
    message: "User found",
    data: "user",
  });
};
export { POST };
