import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { SeoManager } from './seo/SeoManager'

export function SiteLayout() {
  const { pathname, hash } = useLocation()

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
      <a className="skip-link" href="#main-content">
        رفتن به محتوای اصلی
      </a>
      <SeoManager />
      <SiteHeader />
      <div id="main-content">
        <Outlet />
      </div>
      <SiteFooter />
    </>
  )
}
