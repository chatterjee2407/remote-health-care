import { auth, clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";

const protectedroutes = createRouteMatcher([
    '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

export default clerkMiddleware((auth,req) => {;
if (protectedroutes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};