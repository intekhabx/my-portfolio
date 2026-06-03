import { NextRequest, NextResponse } from "next/server";
// import JWT from 'jsonwebtoken';

// const EMAIL = process.env.ADMIN_EMAIL;
// const SECRET = process.env.JWT_SECRET;


export async function proxy(req: NextRequest){
  try {
    //extract token from cookie
    const token = req.cookies.get("admin-token")?.value;

    // if user wants to go on login page
    const {pathname} = req.nextUrl
    if(pathname === '/admin/login'){
      return NextResponse.next();
    }

    if(!token){
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // *****nextjs middleware doesn't support jwt*** so we have to strict verify on server component
    // if(!SECRET){
    //   throw new Error("SECRET IS MISSING")
    // }
    // const decoded = JWT.verify(token, SECRET) as {email: string};

    // if(decoded.email !== EMAIL){
    //   return NextResponse.redirect(new URL("/admin/login", req.url));
    // }

    return NextResponse.next();
  } 
  catch (err) {
    console.error("MIDDLEWARE ERROR:", err);
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }
}


// nextjs first checks: is user is in admin route? if yes then run middleware
export const config = {
  matcher: ["/admin/:path*"]
}