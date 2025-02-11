import { Card, CardContent } from '@/components/ui/card'

import { HomeCard } from '@/features/home/components/home-card'
import HomeCarousel from '@/features/home/components/home-carousel'

import ProductSlider from '@/features/products/components/product-slider'

//actions
import { getAllCategories, getProductsByTag, getProductsForCard } from '@/features/products/server/actions/product.actions'


import data from '@/lib/data'
import { toSlug } from '@/lib/utils'

export default async function Page() {
  const categories = (await getAllCategories())?.data?.slice(0, 4) || []
  
  const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })

  const newArrivals = await getProductsForCard({
    tag: 'new-arrival',
    limit: 4,
  })

  const featured = await getProductsForCard({
    tag: 'featured',
    limit: 4,
  })

  const bestSellers = await getProductsForCard({
    tag: 'best-seller',
    limit: 4,
  })

  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See more',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'New Arrivals',
      items: newArrivals?.data || [],
      link: {
        text: 'View all',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers?.data || [],
      link: {
        text: 'View all',
        href: '/search?tag=best-seller',
      },
    },
    {
      title: 'Featured',
      items: featured?.data || [],
      link: {
        text: 'Shop Now',
        href: '/search?tag=featured',
      },
    },
  ]

  return (
    <>
      <HomeCarousel items={data.carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        <HomeCard cards={cards} />

        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider
              title='Today’s Deals'
              products={todaysDeals?.data || []}
            />
          </CardContent>
        </Card>

        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider
              title='Best Selling Products'
              products={bestSellingProducts?.data || []}
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
