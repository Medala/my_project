import { cartUrl, loginUrl, searchPageUrl } from "@/lib/constants"
import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop: React.FC = () => {
  const location = useLocation()

  // Define an array of paths where you want to auto-scroll to the top
  const scrollToTopPaths: string[] = [cartUrl, searchPageUrl, loginUrl]

  useEffect(() => {
    if (scrollToTopPaths.includes(location.pathname)) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return null
}

export default ScrollToTop
