import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Temporarily disabled - allow access to all pages
  return NextResponse.next()
  
  /* 
  // Check if user is trying to access the main site
  if (request.nextUrl.pathname === "/") {
    // Check if user has access token in cookies
    const hasAccess = request.cookies.get("hommit_access")

    if (!hasAccess) {
      // Redirect to gate page if no access
      return NextResponse.redirect(new URL("/gate", request.url))
    }
  }

  // Allow access to gate page, admin, and other routes
  if (
    request.nextUrl.pathname.startsWith("/gate") ||
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  return NextResponse.next()
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
