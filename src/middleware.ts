import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  
  // DEVELOPMENT MODE: Mock authentication bypass
  // Set to true to bypass Supabase authentication checks
  const MOCK_AUTH_ENABLED = true
  
  if (MOCK_AUTH_ENABLED) {
    console.log('[Middleware] Mock auth enabled, allowing all routes')
    return res
  }
  
  // Real authentication check
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Handle root path and auth routes protection
  if (request.nextUrl.pathname === '/') {
    if (session) {
      return NextResponse.redirect(new URL('/app/dashboard', request.url))
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Protect app routes
  if (request.nextUrl.pathname.startsWith('/app')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect if logged in user tries to access auth pages
  if (['/login', '/signup'].includes(request.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/app/dashboard', request.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/', '/app/:path*', '/login', '/signup']
}
