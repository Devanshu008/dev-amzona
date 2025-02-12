'use client'

import Link from 'next/link'

import { ShoppingCartIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import useInMounted from '@/hooks/use-in-mounted'
import useCartStore from '@/features/order/hooks/use-cart-store'

export default function CartButton() {
  const isMounted = useInMounted()

  const {
    cart: { items },
  } = useCartStore()

  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)

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
      </div>
    </Link>
  )
}
