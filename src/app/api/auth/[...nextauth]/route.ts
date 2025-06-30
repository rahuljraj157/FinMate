

// import NextAuth, { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import userModel from '@/model/user';
// import { connectDB } from '@/lib/db';

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Email and password are required');
//         }

//         await connectDB();

//         const userDoc = await userModel.findOne({ email: credentials.email });
//         if (!userDoc) throw new Error('User not found');

//         const ok = await bcrypt.compare(credentials.password, userDoc.password);
//         if (!ok) throw new Error('Invalid credentials');

//         /* ✅ Return a plain object with **id** (not _id) */
//         return {
//           id: userDoc._id.toString(),
//           name: userDoc.name,
//           email: userDoc.email,
//         };
//       },
//     }),
//   ],

//   pages: {
//     signIn: '/auth/login',
//     error:  '/auth/login',
//   },

//   session: { strategy: 'jwt' },
//   secret: process.env.NEXTAUTH_SECRET ?? 'rah123rahul=',

//   callbacks: {
//     async jwt({ token, user }) {
//       /* Runs on sign‑in; persist id into the token */
//       if (user) token.id = (user as { id: string }).id;

//       return token;
//     },
//     async session({ session, token }) {
//       /* Expose id on session.user */
//       if (session.user && token?.id) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import userModel from '@/model/user';
// import { connectDB } from '@/lib/db';
// import type { NextAuthOptions } from 'next-auth';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Email and password are required');
//         }

//         await connectDB()

//         const userDoc = await userModel.findOne({ email: credentials.email });
//         if (!userDoc) throw new Error('User not found');

//         const ok = await bcrypt.compare(credentials.password, userDoc.password);
//         if (!ok) throw new Error('Invalid credentials');

//         // ✅ Return user object with id, name, and email
//         return {
//           id: userDoc._id.toString(),
//           name: userDoc.name,
//           email: userDoc.email,
//         };
//       },
//     }),
//   ],

//   pages: {
//     signIn: '/auth/login',
//     error: '/auth/login',
//   },

//   session: { strategy: 'jwt' },
//   secret: process.env.NEXTAUTH_SECRET ?? 'rah123rahul=',

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = (user as { id: string }).id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user && token.id) {
//         (session.user as { id: string }).id = token.id as string;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authoptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
