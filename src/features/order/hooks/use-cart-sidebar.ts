import { usePathname } from 'next/navigation'

import useDeviceType from '@/hooks/use-device-type'

import useCartStore from '@/features/order/hooks/use-cart-store'

const isNotInPaths = (s: string) => {
    return !/^\/(cart|checkout|sign-in|sign-up|order(?:\/.*)?|account(?:\/.*)?|admin(?:\/.*)?)$/.test(s);
};


function useCartSidebar() {
  const {
    cart: { items },
  } = useCartStore()

  const deviceType = useDeviceType()
  const currentPath = usePathname()

  return (
    items.length > 0 && deviceType === 'desktop' && isNotInPaths(currentPath)
  )
}

export default useCartSidebar
