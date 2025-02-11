import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type BrowsingHistoryStore = {
  products: { id: string; category: string[] }[]
}

const initialState: BrowsingHistoryStore = {
  products: [],
}

export const BrowsingHistoryStore = create<BrowsingHistoryStore>()(
  persist(() => initialState, {
    name: 'browsingHistoryStore',
  })
)

export default function useBrowsingHistory() {
  const { products } = BrowsingHistoryStore()

  return {
    products,
    addItem: (product: { id: string; category: string[] }) => {
      const index = products.findIndex((item) => item.id === product.id)

      if (index !== -1) products.splice(index, 1)
      products.unshift(product)

      if (products.length > 10) products.pop()

      BrowsingHistoryStore.setState({ products })
    },
    clear: () => {
      BrowsingHistoryStore.setState({ products: [] })
    },
  }
}
