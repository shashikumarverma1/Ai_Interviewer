import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("✅ Middleware is running on:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
