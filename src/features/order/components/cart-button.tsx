'use client'

import Link from 'next/link'

import { ShoppingCartIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import useInMounted from '@/hooks/use-in-mounted'

//Store and actions
import { useAppSelector } from '@/store/hook'

import useCartSidebar from '@/features/order/hooks/use-cart-sidebar'

export default function CartButton() {
  const isMounted = useInMounted()

  const { items } = useAppSelector((state) => state.cart)

  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)

  const isCartSidebarOpen = useCartSidebar()

  return (
    <Link href='/cart' className='px-1 header-button'>
      <div className='flex items-end text-xs relative'>
        <ShoppingCartIcon className='h-8 w-8' />

        {isMounted && (
          <span
            className={cn(
              `bg-black  px-1 rounded-full text-primary text-base font-bold absolute left-[10px] top-[-4px] z-10`,
              cartItemsCount >= 10 && 'text-sm px-0 p-[1px]'
            )}
          >
            {cartItemsCount}
          </span>
        )}
        <span className='font-bold'>Cart</span>

        {isCartSidebarOpen && items.length > 0 && (
          <div
            className={`absolute top-[20px] right-[-16px] rotate-[-90deg] z-10 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[8px] border-transparent border-b-background`}
          ></div>
        )}
      </div>
    </Link>
  )
}
