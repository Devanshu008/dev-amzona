import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db'

export const GET = async (request: NextRequest) => {
  const listType = request.nextUrl.searchParams.get('type') || 'history';
  const productIdsParam = request.nextUrl.searchParams.get('ids');
  const categoriesParam = request.nextUrl.searchParams.get('categories');

  if (!productIdsParam || !categoriesParam) {
    return NextResponse.json([]);
  }

  const productIds = productIdsParam.split(',').map(id => id.trim());
  const categories = categoriesParam.split(',').map(cat => cat.trim());

  let products;

  if (listType === 'history') {
    products = await db.product.findMany({
      where: {
        id: { in: productIds },
      },
    });
    
    products.sort(
      (a, b) => productIds.indexOf(a.id) - productIds.indexOf(b.id)
    );
  } else {
    products = await db.product.findMany({
      where: {
        category: { in: categories },
        id: { notIn: productIds },
      },
    });
  }

  return NextResponse.json(products);
}
