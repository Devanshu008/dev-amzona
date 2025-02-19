import { redirect } from 'next/navigation'

import { Metadata } from 'next'

import { auth } from '@/next-auth' 


export const metadata: Metadata = {
  title: 'Checkout',
}

export default async function CheckoutPage() { 
  const session = await auth()

  if (!session?.user) {
    redirect('/sign-in?callbackUrl=/checkout')
  }

  return (
    <div className='flex-1 p-6 sm:p-10'>
      <h1 className='text-lg font-semibold text-gray-900'>Checkout</h1>
    </div>
  )
}
