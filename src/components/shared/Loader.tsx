"use client"

import { useEffect } from "react"

import { usePathname } from "next/navigation"

import NProgress from "nprogress"
import "nprogress/nprogress.css"

// Configure NProgress (optional)
NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 })

export default function Loader() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()

    const timer = setTimeout(() => {
      NProgress.done()
    }, 500) // Delay to smooth transitions

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [pathname]) // Trigger effect when the path changes

  return null // No UI element needed
}
