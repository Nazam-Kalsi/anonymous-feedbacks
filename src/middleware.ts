import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./app/api/auth/[...nextauth]/options";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest,response:NextResponse) {

  const session = await getServerSession({ req: request, res:response,...authOptions })
  // console.log("session :",session);

  const token = await getToken({ req: request });
  const url = request.nextUrl;
  
  if (token && (
    url.pathname.startsWith('/sign-in')||
    url.pathname.startsWith('/sign-up')||
    url.pathname.startsWith('/verify')||
    url.pathname.startsWith('/')
)) return NextResponse.redirect(new URL("/dashboard", request.url));

return NextResponse.redirect(new URL("/sign-in", request.url));
}

// where all the routes are configured on which the middleware runs
export const config = {
  matcher: ["/sign-up", "/sign-in", "/verify"],
};

export { default } from "next-auth/middleware";
