/* eslint-disable boundaries/element-types */
import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { TrashIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

//Store and actions
import { useAppDispatch, useAppSelector } from '@/store/hook'
import {
  updateItemAndTotals,
  removeItemAndUpdate,
} from '@/store/slices/cart-slice'

import ProductPrice from '@/features/products/components/product-price'

import { FREE_SHIPPING_MIN_PRICE } from '@/lib/constants'

export default function CartSidebar() {
  const dispatch = useAppDispatch()
  const { items, itemsPrice } = useAppSelector((state) => state.cart)


  if(items.length === 0) {
    return null
  }


  return (
    <div className='w-32 overflow-y-auto'>
      <div
        className={`w-32 fixed  h-full border-l
        }`}
      >
        <div className='p-2 h-full flex flex-col gap-2 justify-center items-center'>
          <div className='text-center space-y-2'>
            <div> Subtotal</div>
            <div className='font-bold '>
              <ProductPrice price={itemsPrice} plain />
            </div>
            {itemsPrice > FREE_SHIPPING_MIN_PRICE && (
              <div className=' text-center text-xs'>
                Your order qualifies for FREE Shipping
              </div>
            )}

            <Link
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'rounded-full hover:no-underline w-full'
              )}
              href='/cart'
            >
              Go to Cart
            </Link>
            <Separator className='mt-3' />
          </div>

          <ScrollArea className='flex-1  w-full'>
            {items.map((item) => (
              <div key={item.clientId}>
                <div className='my-3'>
                  <Link href={`/product/${item.slug}`}>
                    <div className='relative h-24'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes='20vw'
                        className='object-contain'
                      />
                    </div>
                  </Link>
                  <div className='text-sm text-center font-bold'>
                    <ProductPrice price={item.price} plain />
                  </div>
                  <div className='flex gap-2 mt-2'>
                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(value) =>
                        dispatch(
                          updateItemAndTotals({
                            item,
                            quantity: Number(value),
                          })
                        )
                      }
                    >
                      <SelectTrigger className='text-xs w-12 ml-1 h-auto py-0'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: item.countInStock }).map(
                          (_, i) => (
                            <SelectItem value={(i + 1).toString()} key={i + 1}>
                              {i + 1}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <Button
                      variant={'outline'}
                      size={'sm'}
                      onClick={() =>
                        dispatch(
                          removeItemAndUpdate({
                            item,
                          })
                        )
                      }
                    >
                      <TrashIcon className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
