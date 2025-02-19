'use client'
import { useTransition } from 'react'

import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// import useSettingStore from '@/hooks/use-setting-store'

import { toast } from '@/hooks/use-toast'

import { APP_NAME } from '@/lib/constants'

//User Imports
import { IUserSignIn } from '@/features/auth/types'
import { UserSignInSchema } from '@/features/auth/schema/auth'
import { login } from '@/features/auth/actions/auth.action'

const signInDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        email: 'admin@example.com',
        password: '123456',
      }
    : {
        email: '',
        password: '',
      }

export default function CredentialsSignInForm() {
  //   const {
  //     setting: { site },
  //   } = useSettingStore()

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [isLoading, startTransition] = useTransition()

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: IUserSignIn) => {
    startTransition(async () => {
      try {
        const res = await login({
          email: data.email,
          password: data.password,
        })

        if (res?.error) {
          toast({
            title: 'Error',
            description: res.error,
            variant: 'destructive',
          })

          return
        }

        toast({
          title: 'Success',
          description: 'You are now logged in.',
        })
        redirect(callbackUrl)
      } catch (error) {
        if (isRedirectError(error)) {
          throw error
        }

        toast({
          title: 'Error',
          description: 'Invalid email or password',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        <div className='space-y-6'>
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter email address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
          <div className='text-sm'>
            By signing in, you agree to {APP_NAME}&apos;s{' '}
            <Link href='/page/conditions-of-use'>Conditions of Use</Link> and{' '}
            <Link href='/page/privacy-policy'>Privacy Notice.</Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
