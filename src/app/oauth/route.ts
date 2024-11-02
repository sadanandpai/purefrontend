import { cookieName } from "@/lib/server/config/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSessionWithSecret } from "@/lib/server/data-layer/session";
import { routes } from "@/lib/common/routes";
import { createCookie } from "@/lib/server/utils/cookies";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.redirect(routes.signIn);
  }

  const sessionSecret = await createSessionWithSecret(userId, secret);
  await createCookie(cookieName, sessionSecret);
  return NextResponse.redirect(
    `${request.nextUrl.origin}${routes.oauthRedirection}`
  );
}
