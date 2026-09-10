import { NextRequest, NextResponse } from 'next/server';

const DEMO_USER = 'atlas-demo';
const COOKIE_NAME = 'dwell_demo_atlas';

export async function POST(request: NextRequest) {
  let username = '';

  try {
    const body = (await request.json()) as { username?: unknown };
    username = typeof body.username === 'string' ? body.username.trim() : '';
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (username !== DEMO_USER) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, user: DEMO_USER });
  response.cookies.set(COOKIE_NAME, DEMO_USER, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 2,
    path: '/',
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/',
  });
  return response;
}
