'use server'
import Product from '@/lib/db/models/product.model'

import { connectToDatabase } from '@/lib/db'

export async function getAllCategories() {
  try {
    await connectToDatabase(process.env.MONGODB_URI)
    const categories = await Product.find({ isPublished: true }).distinct(
      'category'
    )
    return categories
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get categories.')
  }
}

export async function getProductsForCard({
  tag,
  limit = 4,
}: {
  tag: string
  limit?: number
}) {
  try {
    await connectToDatabase(process.env.MONGODB_URI)

    const products = await Product.find(
      {
        tags: {
          $in: [tag],
        },
        isPublished: true,
      },
      {
        name: 1,
        href: { $concat: ['/product/', '$slug'] },
        image: {
          $arrayElemAt: ['$images', 0],
        },
      }
    )
      .sort({ createdAt: -1 })
      .limit(limit)

      return JSON.parse(JSON.stringify(products)) as {
        name: string
        href: string
        image: string
      }[]

  } catch (error) {
    console.error(error)
    throw new Error('Failed to get products for card.')
  }
}

export const getProducts = async () => {
  try {
    await connectToDatabase(process.env.MONGODB_URI)

    const products = await Product.find()

    return products
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get products.')
  }
}
