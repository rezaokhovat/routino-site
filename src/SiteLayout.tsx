import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { pageTitles } from './siteNav'

export function SiteLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = pageTitles[pathname] ?? 'روتینو'
  }, [pathname])

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  )
}
