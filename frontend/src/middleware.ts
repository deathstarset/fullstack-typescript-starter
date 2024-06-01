import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export const config = {
  matcher: ["/dashboard", "/dashboard/(.*)"],
};
export async function middleware(request: NextRequest) {
  const token = cookies().get("token")?.value;
  const role = cookies().get("role")?.value;
  const absoluteUrl = new URL("/auth/login", request.url).toString();
  if (!role || !token) {
    return NextResponse.redirect(absoluteUrl);
  }
  try {
    const res = await axios.get("http://localhost:8080/api/v1/auth/check", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return NextResponse.redirect(absoluteUrl);
  }

  return NextResponse.next();
}
