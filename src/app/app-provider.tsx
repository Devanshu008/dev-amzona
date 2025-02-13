'use client'
import { FC, ReactNode } from 'react'

//react-query package
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from '@/components/ui/toaster'

import CartSidebar from '@/components/shared/cart-sidebar'
import Loader from '@/components/shared/Loader'

import useCartSidebar from '@/features/order/hooks/use-cart-sidebar'

const queryClient = new QueryClient()

type AppProviderProps = {
  children: ReactNode
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const visible = useCartSidebar()

  return (
    <>
      <div className='flex min-h-screen'>
        <QueryClientProvider client={queryClient}>
          <Loader />
          <div className='flex-1 overflow-hidden'>{children}</div>

          {visible && <CartSidebar />}
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </>
  )
}

export default AppProvider
