import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./app/api/auth/[...nextauth]/options";

export async function middleware(request: NextRequest) {
  // const session = await getServerSession({ req: request, res:response,...authOptions })
  // const session = await getServerSession(authOptions);
  // we can't use session in middleware as it is build to be use in server API routes & server components. Middleware run on edge and have limited support for certain Node.js features.
  const token = await getToken({ req: request });
  console.log("token in middleware : ", token);
  const url = request.nextUrl;

  if (!token && !url.pathname.startsWith('/signIn')) return NextResponse.redirect(new URL("/signIn", request.url));

  if (token && (
    url.pathname.startsWith('/signIn') ||
    url.pathname.startsWith('/signup') ||
    url.pathname.startsWith('/verify')) &&
    url.pathname.startsWith('/dashboard')
  ) return NextResponse.redirect(new URL("/dashboard", request.url));
  return NextResponse.next();
}


export const config = {
  matcher: ["/signIn", "/signup", "/u/:path*"],
};

export { default } from "next-auth/middleware";
