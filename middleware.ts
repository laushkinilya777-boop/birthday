import { withAuth } from 'next-auth/middleware';

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: ['/orders/create', '/profile', '/my-orders', '/my-applications'],
};
