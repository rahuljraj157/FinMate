
// import NextAuth, { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import user from "@/model/user";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/db";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and Password are required!");
//         }
//         await connectDB();

//         const data = await user.findOne({ email: credentials?.email });
//         if (!data) {
//           throw new Error("User not found!");
//         }

//         const isMatch = await bcrypt.compare(credentials?.password, data.password);
//         if (isMatch) {
//           return data
//         }
//         return null

       
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET || "rah123rahul=",
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


// // app/api/auth/[...nextauth]/route.ts
// // import NextAuth, { AuthOptions } from 'next-auth';
// // import CredentialsProvider from 'next-auth/providers/credentials';
// // import bcrypt from 'bcryptjs';
// // import user from '@/model/user';
// // import { connectDB } from '@/lib/db';          // <‑‑ your Mongo connection helper

// // export const authOptions: AuthOptions = {
// //   providers: [
// //     CredentialsProvider({
// //       name: 'Credentials',
// //       credentials: {
// //         email: { label: 'Email', type: 'text' },
// //         password: { label: 'Password', type: 'password' },
// //       },
// //       async authorize(credentials) {
     
// //         if (!credentials?.email || !credentials?.password) {
// //           throw new Error('Email and password are required');
// //         }

       
// //         await connectDB();

// //         // 3️⃣ Find the user
// //         const User = await user.findOne({ email: credentials.email }).lean(); // lean() ⇒ plain JS obj
// //         if (!User) throw new Error('User not found');

// //         // 4️⃣ Check password
// //         const isMatch = await bcrypt.compare(credentials.password, user.password);
// //         if (!isMatch) throw new Error('Invalid credentials');

// //         // 5️⃣ Return a **serialisable** object (no Mongoose doc!)
// //         return {
// //           id: user.id.toString(),
// //           name: user.name,
// //           email: user.email,
// //         };
// //       },
// //     }),
// //   ],

// //   pages: {
// //     signIn: '/login',      // your custom login page
// //     error:  '/login',      // send auth errors back to login (or create a page)
// //   },

// //   session: {
// //     strategy: 'jwt',
// //   },

// //   secret: process.env.NEXTAUTH_SECRET || 'rah123rahul=',

// //   callbacks: {
// //     // put the user id into the JWT token
// //     async jwt({ token, user }) {
// //       if (user) token.id = user.id;
// //       return token;
// //     },
// //     // expose id on the session object
// //     async session({ session, token }) {
// //       if (token?.id && session.user) session.user.id = token.id as string;
// //       return session;
// //     },
// //   },
// // };

// // const handler = NextAuth(authOptions);
// // export { handler as GET, handler as POST };

import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import userModel from '@/model/user';
import { connectDB } from '@/lib/db';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await connectDB();

        const userDoc = await userModel.findOne({ email: credentials.email });
        if (!userDoc) throw new Error('User not found');

        const ok = await bcrypt.compare(credentials.password, userDoc.password);
        if (!ok) throw new Error('Invalid credentials');

        /* ✅ Return a plain object with **id** (not _id) */
        return {
          id: userDoc._id.toString(),
          name: userDoc.name,
          email: userDoc.email,
        };
      },
    }),
  ],

  pages: {
    signIn: '/auth/login',
    error:  '/auth/login',
  },

  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET ?? 'rah123rahul=',

  callbacks: {
    async jwt({ token, user }) {
      /* Runs on sign‑in; persist id into the token */
      if (user) token.id = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      /* Expose id on session.user */
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

