'use server'
import { redirect } from 'next/navigation'

import { AuthError } from 'next-auth'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { db } from '@/db'
import { UserSignInSchema, UserSignUpSchema } from '@/features/auth/schema/auth'
import { signIn, signOut } from '@/next-auth'

import { formatError } from '@/lib/utils'

export const login = async (values: z.infer<typeof UserSignInSchema>) => {
  const validatedFields = UserSignInSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  const { email, password } = validatedFields.data

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: 'Invalid credentials',
    }
  }

  //   if(!existingUser.emailVerified){
  //     const verificationToken = await generateVerificationToken(email);

  //     await sendVerificationEmail(verificationToken.email, verificationToken.token);

  //     return {
  //       success: "Confirmation email sent!",
  //     };
  //   }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError) {

      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid credentials',
          }

        case 'AccessDenied': {
          return {
            error: 'Please verify your email',
          }
        }
        

        default: {
          return {
            error: 'Something went wrong',
          }
        }
      }
    }

    throw error
  }
}

export const logOut = async () => {
  const redirectTo = await signOut({
    redirect: false,
  })

  redirect(redirectTo.redirect)
}

export const register = async (values: z.infer<typeof UserSignUpSchema>) => {
  try {
    const validatedFields = UserSignUpSchema.safeParse(values)

    if (!validatedFields.success) {
      throw new Error(validatedFields.error.message)
    }

    const { email, name, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.user.findUnique({ where: { email } })

    if (existingUser) {
      throw new Error('User already exists')
    }

    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    return { success: 'User created successfully' }
  } catch (error) {
    return { error: formatError(error) }
  }
}
