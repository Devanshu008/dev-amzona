import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { calculateCartTotals } from '@/features/order/lib/utils'
import { Cart, OrderItem } from '@/features/order/types'

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: undefined,
  shippingPrice: undefined,
  totalPrice: 0,
  paymentMethod: undefined,
  deliveryDateIndex: undefined,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemAndUpdate: (state, action: PayloadAction<{ item: OrderItem; quantity: number }>) => {
      const { item, quantity } = action.payload
      const existItem = state.items.find(i => i.product === item.product && i.color === item.color && i.size === item.size)
      
      if (existItem) {
        if (existItem.countInStock < quantity + existItem.quantity) throw new Error('Not enough items in stock')
        existItem.quantity += quantity
      } else {
        if (item.countInStock < quantity) throw new Error('Not enough items in stock')
        state.items.push({ ...item, quantity })
      }
      
      Object.assign(state, calculateCartTotals(state.items))
    },
    updateItemAndTotals: (state, action: PayloadAction<{ item: OrderItem; quantity: number }>) => {
      const { item, quantity } = action.payload
      
      state.items = state.items.map(x => x.product === item.product && x.color === item.color && x.size === item.size ? { ...x, quantity } : x)
      
      Object.assign(state, calculateCartTotals(state.items))
    },
    removeItemAndUpdate: (state, action: PayloadAction<{ item: OrderItem }>) => {
      state.items = state.items.filter(x => x.product !== action.payload.item.product || x.color !== action.payload.item.color || x.size !== action.payload.item.size)
      
      Object.assign(state, calculateCartTotals(state.items))
    },
    resetCart: () => initialState,
  },
})

export const { addItemAndUpdate, updateItemAndTotals, removeItemAndUpdate, resetCart } = cartSlice.actions
export default cartSlice.reducer
