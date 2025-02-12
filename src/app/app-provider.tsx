'use client'
import { FC, ReactNode } from 'react'

//react-query package
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from '@/components/ui/toaster'

const queryClient = new QueryClient()

type AppProviderProps = {
  children: ReactNode
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default AppProvider
