import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  // After email verification, redirect to dashboard
  if (code) {
    return NextResponse.redirect(new URL('/app/dashboard', request.url))
  }

  // If no code, redirect to error page
  return NextResponse.redirect(new URL('/auth-error', request.url))
}