import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

//! --- Tugas H16: modifikasi routing using middleware ---

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get("user_token");
  const isJwtFormat = isCookiesExist
    ? jwtDecode(String(request.cookies.get("user_token").value))
    : false;
  const isLoginPage = pathname.startsWith("/login");

  console.log("is login => ", isLoginPage);
  console.log("is Cookies Exist => ", isCookiesExist);
  console.log("is jwt => ", isJwtFormat);

  //? -- using 'conditional' statements: for validation of user login ---
  // jika 'cookies tidak ada' dan user lagi 'NOT di halaman login' => redirect ke "/login"
  if (isCookiesExist === false && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // jika 'cookies ada' dan user lagi 'di halaman login' => redirect ke "/"
  if (isCookiesExist && isLoginPage && isJwtFormat) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

//! --- Tugas H16: add config at 'custom matcher' > for specific path ---
//? -- When user has logged in, these paths will be allowed -- not blocking
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
//TODO: in this case, we only use 'matcher' for 'static' files
