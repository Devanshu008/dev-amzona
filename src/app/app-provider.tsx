'use client'
import { FC, ReactNode } from 'react'

//react-redux package
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store'

import { Toaster } from '@/components/ui/toaster'

import CartSidebar from '@/components/shared/cart-sidebar'
import Loader from '@/components/shared/Loader'

import useCartSidebar from '@/features/order/hooks/use-cart-sidebar'

type AppProviderProps = {
  children: ReactNode
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const visible = useCartSidebar()

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className='flex min-h-screen'>
            <Loader />
            <div className='flex-1 overflow-hidden'>{children}</div>
            {visible && <CartSidebar />}
            <Toaster />
          </div>
        </PersistGate>
      </Provider>
    </>
  )
}

export default AppProvider
