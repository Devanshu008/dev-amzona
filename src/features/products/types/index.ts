import { z } from 'zod'

import {
  ProductInputSchema,
  ReviewInputSchema,
} from '@/features/products/schema/product'

export type IProductInput = z.infer<typeof ProductInputSchema>
export type IReviewInput = z.infer<typeof ReviewInputSchema>

export type IReviewDetails = IReviewInput & {
  _id: string
  createdAt: string
  user: {
    name: string
  }
}

export type Data = {
  products: IProductInput[]

  // reviews: {
  //   title: string
  //   rating: number
  //   comment: string
  // }[]
}
