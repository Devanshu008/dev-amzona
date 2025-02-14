'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

//Store and actions
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { addItemAndUpdate } from '@/store/slices/cart-slice'

import { useToast } from '@/hooks/use-toast'

import { OrderItem } from '@/features/order/types'

export default function AddToCart({
  item,
  minimal = false,
}: {
  item: OrderItem
  minimal?: boolean
}) {
  const router = useRouter()
  const { toast } = useToast()

  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)

  const [quantity, setQuantity] = useState(1)

  return minimal ? (
    <Button
      className='rounded-full w-auto'
      onClick={() => {
        try {
          dispatch(
            addItemAndUpdate({
              item,
              quantity: 1,
            })
          )
          toast({
            description: 'Item added to cart',
            action: (
              <Button onClick={() => router.push('/cart')}>View Cart</Button>
            ),
          })
        } catch (error: any) {
          toast({
            variant: 'destructive',
            description: error.message,
          })
        }
      }}
    >
      Add to cart
    </Button>
  ) : (
    <div className='w-full space-y-2'>
      <Select
        value={quantity.toString()}
        onValueChange={(i) => setQuantity(Number(i))}
      >
        <SelectTrigger>
          <SelectValue>Quantity:{quantity}</SelectValue>
        </SelectTrigger>
        <SelectContent position='popper'>
          {[...Array(item.countInStock).keys()].map((i) => (
            <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className='rounded-full w-full'
        type='button'
        onClick={async () => {
          try {
            dispatch(
              addItemAndUpdate({
                item,
                quantity,
              })
            )
            
           const hasItem = items.find(
              (i) =>
                i.product === item.product &&
                i.color === item.color &&
                i.size === item.size
            )?.clientId!

            const itemId = hasItem || item.clientId

            router.push(`/cart/${itemId}`)
          } catch (error: any) {
            toast({
              variant: 'destructive',
              description: error.message,
            })
          }
        }}
      >
        Add to cart
      </Button>
      <Button
        variant='secondary'
        className='w-full rounded-full'
        onClick={async () => {
          try {
            dispatch(
              addItemAndUpdate({
                item,
                quantity,
              })
            )
            router.push('/checkout')
          } catch (error: any) {
            toast({
              variant: 'destructive',
              description: error.message,
            })
          }
        }}
      >
        Buy now
      </Button>
    </div>
  )
}
