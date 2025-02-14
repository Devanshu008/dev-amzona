import { combineReducers, Middleware } from '@reduxjs/toolkit'

import cartSlice from '@/store/slices/cart-slice'
import browserHistorySlice from '@/store/slices/browsing-history-slice'

// Root Reducer - Combine all slices here
export const rootReducer = combineReducers({
  cart: cartSlice,
  browsingHistory: browserHistorySlice,
})

// Middleware - Extend this array with necessary middleware
export const concatMiddleware: Middleware[] = []
