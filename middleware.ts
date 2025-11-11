import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  if (!currentPath.startsWith("/dashboard")) return NextResponse.next();

  const token = await getToken({ req, secret });
  const authUrl = new URL("/signin", req.url);
console.log("token",token);

  if (!token) return NextResponse.redirect(authUrl);

  const role = token.role as string;
  if(!role) return NextResponse.redirect(authUrl);
  if(role !== "ADMIN" && role !== "CUSTOMER") return NextResponse.redirect(authUrl);
  
  const customerNotAllowed = role === "CUSTOMER" && currentPath.startsWith("/dashboard");
  if (customerNotAllowed) {
    return NextResponse.redirect(new URL("/", req.url));
  }
 
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};