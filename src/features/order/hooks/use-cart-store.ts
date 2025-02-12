import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Cart, OrderItem } from '@/features/order/types'
import { calcDeliveryDateAndPrice } from '@/features/order/server/actions/order.actions'

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: undefined,
  shippingPrice: undefined,
  totalPrice: 0,
  paymentMethod: undefined,
  deliveryDateIndex: undefined,
}

interface CartStore {
  cart: Cart
  addItem: (item: OrderItem, quantity: number) => Promise<string>
}

const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cart: initialState,
      addItem: async (item: OrderItem, quantity: number) => {
        const { cart } = get()

        const existItem = cart.items.find(
          (i) =>
            i.product === item.product &&
            i.color === item.color &&
            i.size === item.size
        )

        if (existItem) {
          if (existItem.countInStock < quantity + existItem.quantity) {
            throw new Error('Not enough items in stock')
          }
        } else {
          if (item.countInStock < item.quantity) {
            throw new Error('Not enough items in stock')
          }
        }

        const updatedCartItems = existItem
          ? cart.items.map((x) =>
              x.product === item.product &&
              x.color === item.color &&
              x.size === item.size
                ? { ...x, quantity: existItem.quantity + quantity }
                : x
            )
          : [...cart.items, { ...item, quantity }]

        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
            })),
          },
        })

        return updatedCartItems.find(
          (i) =>
            i.product === item.product &&
            i.color === item.color &&
            i.size === item.size
        )?.clientId!
      },
      init: () => set({ cart: initialState }),
    }),
    {
      name: 'cart-store',
    }
  )
)

export default useCartStore
