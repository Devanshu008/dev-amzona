import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from '@/db'
import authConfig from '@/next-auth/auth.config'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
    error: '/sign-in',
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false

      if (account.provider !== 'credentials') return true

      if (!user.id) return false

      const existingUser = await db.user.findUnique({
        where: {
          id: user.id,
        },
      })

      // prevent login if user is not verified
      if (!existingUser) return false

      //TODO: Add 2FA check

      return true
    },
    async session({ session, token }) {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }

        if (token.role && session.user) {
          session.user.role = token.role;
        }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      })

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    },
  },
  ...authConfig,
})
