// // File: src/app/api/auth/[...nextauth]/route.ts
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/lib/prisma"; // Ensure this path correctly points to your prisma instance
// import bcrypt from "bcrypt";

// // NextAuth configuration options
// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     // Credentials provider (email/password login)
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing email or password");
//         }
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.password) {
//           throw new Error("No user found with the provided email");
//         }

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isValid) {
//           throw new Error("Incorrect password");
//         }
//         // Return user object containing role and other fields
//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//     // Google provider for OAuth
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//         token.picture = (user as any).image ?? token.picture;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.role = token.role as string;
//         session.user.image = token.picture as string | undefined;
//       }
//       return session;
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) {
          throw new Error("No user found with the provided email");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Incorrect password");
        }
        // Include image so it lands in the JWT
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // On initial sign in, persist everything
      if (user) {
        token.role = (user as any).role;
        token.picture = (user as any).image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user?.email) {
        // Re-fetch the fresh user record
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        session.user.role = token.role as string;
        session.user.name = dbUser?.name ?? session.user.name;
        session.user.email = dbUser?.email ?? session.user.email;
        session.user.image = dbUser?.image ?? (token.picture as string);
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
