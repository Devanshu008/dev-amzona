'use server'

import { IProductInput } from '@/types'
import { db } from '../db'

export async function getAllCategories() {
  try {
    const categories = await db.product.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    })

    return categories.map((category) => category.category)
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

    const products = await db.product.findMany({
      where: {
        tags: {
          hasSome: [tag],
        },
        isPublished: true,
      },
      select: {
        name: true,
        slug: true,
        images: true,
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return products.map((product) => ({
      name: product.name,
      href: `/product/${product.slug}`,
      image: product.images[0],
    }))

  } catch (error) {
    console.error(error)
    throw new Error('Failed to get products for card.')
  }
}

//Get Products By Tag
export async function getProductsByTag({
  tag,
  limit = 10,
}:{
  tag: string
  limit?: number
}){
  try{
    const products = await db.product.findMany({
      where:{
        tags:{
          hasSome:[tag],
        },
        isPublished: true,
      },
      take: limit,
      orderBy:{
        createdAt: 'desc',
      },
    })

    return products as IProductInput[]

  }catch(error){
    console.error(error)
    throw new Error('Failed to get products by tag.')
  }
}