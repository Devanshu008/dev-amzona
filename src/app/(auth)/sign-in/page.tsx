import { redirect } from 'next/navigation'
import Link from 'next/link'

import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import SeparatorWithOr from '@/components/shared/separator-or'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { auth } from '@/next-auth'

import { APP_NAME } from '@/lib/constants'

import CredentialsSignInForm from '@/features/auth/components/credentials-signin-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function SignInPage(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const searchParams = await props.searchParams

  //   const { site } = await getSetting()

  const { callbackUrl = '/' } = searchParams

  const session = await auth()

  if (session) {
    return redirect(callbackUrl)
  }

  return (
    <div className='w-full'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <CredentialsSignInForm />
            {/* <SeparatorWithOr /> */}
            {/* <div className='mt-4'>
              <GoogleSignInForm />
            </div> */}
          </div>
        </CardContent>
      </Card>
      <SeparatorWithOr>New to {APP_NAME}?</SeparatorWithOr>

      <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
        <Button className='w-full' variant='outline'>
          Create your {APP_NAME} account
        </Button>
      </Link>
    </div>
  )
}
