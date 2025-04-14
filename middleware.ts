export { auth as middleware } from "./auth";

// Runtime is now configured in next.config.ts
export const config = {
  matcher: ["/dashboard/:path*"],
};
