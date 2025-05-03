import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("token")?.value

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/submit"]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // If it's a protected route and there's no token, redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // If there is a token, verify it
  if (token) {
    const payload = await verifyToken(token)

    // If token is invalid and it's a protected route, redirect to login
    if (!payload && isProtectedRoute) {
      const url = new URL("/login", request.url)
      url.searchParams.set("redirect", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/submit/:path*"],
}
