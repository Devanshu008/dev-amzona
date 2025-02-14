"use client"

import { useEffect } from "react"

import { usePathname } from "next/navigation"

import progressBar from "nprogress"
import "nprogress/nprogress.css"

// Configure NProgress (optional)
progressBar.configure({ showSpinner: false, speed: 400 })

export default function Loader() {
  const pathname = usePathname()

  useEffect(() => {
    progressBar.start()

    const timer = setTimeout(() => {
      progressBar.done()
    }, 500) // Delay to smooth transitions

    return () => {
      clearTimeout(timer)
      progressBar.done()
    }
  }, [pathname]) // Trigger effect when the path changes

  return null // No UI element needed
}
