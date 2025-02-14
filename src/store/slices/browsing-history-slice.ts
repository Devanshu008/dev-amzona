import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: string
  category: string[]
}

interface BrowsingHistoryState {
  products: Product[]
}

const initialState: BrowsingHistoryState = {
  products: [],
}

const browsingHistorySlice = createSlice({
  name: 'browsingHistory',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      )
      state.products.unshift(action.payload)
      if (state.products.length > 10) state.products.pop()
    },
    clear: (state) => {
      state.products = []
    },
  },
})

export const { addItem, clear } = browsingHistorySlice.actions
export default browsingHistorySlice.reducer
