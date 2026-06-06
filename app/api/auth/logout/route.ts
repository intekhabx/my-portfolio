import dbConnection from "@/lib/db";
import { isLoggedIn } from "@/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest){
  try {
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.json({
        error: "UnAuthorized"
      }, {status: 401});
    }

    await dbConnection();

    const response = NextResponse.json({
      message: "logged out successfully"
    }, {status: 200})

    response.cookies.delete("admin-token");
    return response;
  } 
  catch (err) {
    console.error("error while logging out",err);
    return NextResponse.json({
      error: "something went wrong while logout"
    }, {status: 500})
  }
}