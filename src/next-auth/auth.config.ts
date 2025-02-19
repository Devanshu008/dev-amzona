// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credential from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { LoginSchema } from '@/lib/validator'
import { db } from '@/db'


export default {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // Github({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    Credential({
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials)

        if (!parsed.success) {
          throw new Error('Invalid credentials')
        }

        const { email, password } = parsed.data

        const user = await db.user.findUnique({
          where: {
            email,
          },
        })

        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
