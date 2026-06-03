import JWT from 'jsonwebtoken';
import { NextRequest } from 'next/server';


const EMAIL = process.env.ADMIN_EMAIL;
const SECRET = process.env.JWT_SECRET;


export async function isLoggedIn(req: NextRequest){
  try {
    //extract token from cookie
    const token = req.cookies.get("admin-token")?.value;

    if(!token){
      return false;
    }

    if(!SECRET){
      throw new Error("SECRET IS MISSING")
    }
    const decoded = JWT.verify(token, SECRET) as {email: string};

    if(decoded.email !== EMAIL){
      return false;
    }

    return true;
  } 
  catch (err) {
    console.error("AUTHENTICATION ERROR:", err);
    return false;
  }
}