import { z } from "zod"

import { UserInputSchema, UserNameSchema, UserSignInSchema, UserSignUpSchema } from "@/features/auth/schema/auth"

export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>
export type IUserName = z.infer<typeof UserNameSchema>

export type Data = {
  users: IUserInput[]
}