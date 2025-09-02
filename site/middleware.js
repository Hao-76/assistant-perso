import { NextResponse } from "next/server";

export function middleware(request) {
  const auth = request.headers.get("authorization");

  // Définis ton login:password
  const validAuth = "Basic " + btoa("user:monMotDePasseSecret");

  if (auth === validAuth) {
    return NextResponse.next();
  }

  return new NextResponse("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

