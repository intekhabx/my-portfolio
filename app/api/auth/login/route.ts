import JWT, {SignOptions} from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { loginSchemaDto } from "@/lib/validation";

const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET = process.env.JWT_SECRET;
const EXPIRY = process.env.JWT_SECRET_EXPIRES_IN;

export async function POST(request: NextRequest){
  try {
    // extract the payload from request
    const body = await request.json();
    const {email, password} = await loginSchemaDto.parseAsync(body);
    
    if(!EMAIL || !PASSWORD){
      return NextResponse.json({
        error: "ADMIN_EMAIL OR ADMIN_PASSWORD is missing in the env file",
      }, {status: 400})
    }

    if(EMAIL !== email || PASSWORD !== password){
      return NextResponse.json({
        error: "INVALID ADMIN CREDIENTIALS"
      }, {status: 400})
    }

    // genereate token
    if(!SECRET || !EXPIRY){
      return NextResponse.json({
        error: "JWT_SECRET or JWT_EXPIRY is missing in the env file",
      }, {status: 400})
    }
    const token = JWT.sign({email: EMAIL}, SECRET, {
      expiresIn: EXPIRY as SignOptions["expiresIn"]
    })

    // here we don't send the response we draft that response
    const response = NextResponse.json({
      message: "You are Logged In successfully"
    }, {status: 200})

    // add token in the httpOnly cookie #cookie is inbuit in nextjs
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", //cookie is available on every route
      maxAge: 60 * 60 * 24 * 7 //7d - in nextjs maxAge is in second
    })

    return response;
  } 
  catch (err) {
    console.error("error while logging", err);
    return NextResponse.json({
      error: "someting went wrong while logging"
    }, {status: 500})
  }
}