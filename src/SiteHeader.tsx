import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { RoutinoLogo } from './RoutinoLogo'
import { siteNav } from './siteNav'

function navClassName({ isActive }: { isActive: boolean }) {
  return `nav-link${isActive ? ' is-active' : ''}`
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(217,31,64,0.08)]">
      <div className="h-28 max-w-[1240px] mx-auto px-gutter-lg flex flex-col justify-between">
        <div className="h-10 flex items-center justify-between border-b border-outline-variant/30 text-on-surface-variant text-label-badge font-label-badge">
          <div className="flex items-center gap-gutter-md">
            <a
              className="flex items-center gap-1.5 hover:text-brand-red transition-colors"
              href="tel:09903760867"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>۰۹۹۰۳۷۶۰۸۶۷</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>شنبه تا جمعه: ۱۰ صبح تا ۱۰ شب</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-brand-red">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>برند روتینو • سلامت، ورزش و سبک زندگی</span>
            </span>
          </div>
          <div className="flex items-center gap-gutter-md">
            <span className="text-on-surface-variant/80 hidden sm:inline">شبکه‌های اجتماعی:</span>
            <a
              className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center hover:bg-brand-red hover:text-on-primary transition-colors"
              href="https://www.instagram.com/routino.studio/"
              rel="me noopener noreferrer"
              target="_blank"
              title="اینستاگرام روتینو"
              aria-label="اینستاگرام روتینو"
            >
              <span className="material-symbols-outlined text-[15px]">photo_camera</span>
            </a>
          </div>
        </div>
        <div className="h-[72px] flex items-center justify-between gap-gutter-md">
          <div className="flex items-center gap-gutter-xl">
            <RoutinoLogo height={48} onClick={() => setOpen(false)} />
            <nav
              className="hidden xl:flex items-center gap-gutter-xs p-1 bg-surface-container/60 rounded-xl"
              id="main-nav"
              aria-label="منوی اصلی"
            >
              {siteNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={'end' in item ? item.end : false}
                  className={navClassName}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="xl:hidden w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface hover:bg-brand-red hover:text-on-primary transition-colors"
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={open}
              aria-controls="nav-mobile"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="material-symbols-outlined text-[24px]">{open ? 'close' : 'menu'}</span>
            </button>
            <a
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange hover:opacity-95 text-on-primary font-headline-sm text-[15px] font-bold shadow-[0_6px_20px_-4px_rgba(217,31,64,0.4)] transition-all hover:-translate-y-0.5"
              href="tel:09903760867"
            >
              <span className="material-symbols-outlined text-[18px]">headset_mic</span>
              <span>رزرو و هماهنگی آفیش</span>
            </a>
            <div className="w-px h-8 bg-outline-variant/50 hidden sm:block" />
          </div>
        </div>
      </div>
      <div
        className={`xl:hidden border-t border-outline-variant/30 bg-surface/95 backdrop-blur-xl ${open ? '' : 'hidden'}`}
        id="nav-mobile"
      >
        <div className="max-w-[1240px] mx-auto px-gutter-lg py-3 flex flex-col gap-1">
          {siteNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              className={navClassName}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}
