import { usePathname } from 'next/navigation'

import useDeviceType from '@/hooks/use-device-type'


const isNotInPaths = (s: string) => {
    return !/^\/(cart|checkout|sign-in|sign-up|order(?:\/.*)?|account(?:\/.*)?|admin(?:\/.*)?)$/.test(s);
};


function useCartSidebar() {

  const deviceType = useDeviceType()
  const currentPath = usePathname()

  return (
    deviceType === 'desktop' && isNotInPaths(currentPath)
  )
}

export default useCartSidebar
