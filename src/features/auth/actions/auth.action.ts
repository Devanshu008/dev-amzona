'use server'
import { redirect } from 'next/navigation'

import { AuthError } from 'next-auth'

import * as z from 'zod'

import { LoginSchema } from '@/lib/validator'
import { db } from '@/db'
import { signIn, signOut } from '@/next-auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

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
