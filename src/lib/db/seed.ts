import { loadEnvConfig } from '@next/env'
import { cwd } from 'process'

import Product from '@/lib/db/models/product.model'

import { connectToDatabase } from '@/lib/db'
import data from '@/lib/data'

loadEnvConfig(cwd())

const seed = async () => {
  try {
    const { products } = data
    await connectToDatabase(process.env.MONGODB_URI)

    await Product.deleteMany()

    const createdProducts = await Product.insertMany(products)

    console.log(`Created ${createdProducts.length} products.`)

    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database.')
    process.exit(1)
  }
}

seed()