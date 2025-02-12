/* eslint-disable boundaries/element-types */
import Link from 'next/link'


import CartButton from '@/features/order/components/cart-button'

const Menu = () => {
  return (
    <div className='flex justify-end'>
      <nav className='flex gap-3 w-full'>
        {/* <Link href='/cart' className='header-button flex items-center gap-1'>
          <UserIcon className='size-8' />
          <span className='font-bold'>Sign in</span>
        </Link> */}

        <Link href='/signin' className='header-button flex items-center gap-1'>
          Hello, Sign in
        </Link>

        <CartButton />
      </nav>
    </div>
  )
}

export default Menu
