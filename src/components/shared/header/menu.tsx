/* eslint-disable boundaries/element-types */

import UserButton from '@/components/shared/header/user-button'
import CartButton from '@/features/order/components/cart-button'

const Menu = () => {
  return (
    <div className='flex justify-end'>
      <nav className='flex gap-3 w-full'>
        <UserButton/>
        <CartButton />
      </nav>
    </div>
  )
}

export default Menu
