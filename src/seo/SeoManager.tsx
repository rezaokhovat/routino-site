import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, getSeoPage } from './config.ts'
import { buildJsonLd } from './jsonLd.ts'

function upsertMeta(selector: string, attrs: Record<string, string>, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const extraKey = extra
    ? Object.entries(extra)
        .map(([key, value]) => `[${key}="${value}"]`)
        .join('')
    : ''
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${extraKey}`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (extra) {
      for (const [key, value] of Object.entries(extra)) el.setAttribute(key, value)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = getSeoPage(pathname)
    const canonical = page.noindex ? `${SITE.origin}/` : `${SITE.origin}${page.path === '/' ? '/' : page.path}`
    const image = `${SITE.origin}${page.image}`
    const robots = page.robots ?? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

    document.title = page.title
    document.documentElement.lang = SITE.language

    upsertMeta('meta[name="description"]', { name: 'description' }, page.description)
    upsertMeta('meta[name="robots"]', { name: 'robots' }, robots)
    upsertMeta('meta[name="keywords"]', { name: 'keywords' }, SITE.keywords.join(', '))
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, page.title)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, page.description)
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonical)
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, image)
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, page.imageAlt)
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, page.ogType ?? 'website')
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, SITE.locale)
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE.name)
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, page.title)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, page.description)
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, image)

    upsertLink('canonical', canonical)
    upsertLink('alternate', canonical, { hreflang: 'fa-IR' })
    upsertLink('alternate', canonical, { hreflang: 'x-default' })

    let script = document.getElementById('jsonld-graph') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'jsonld-graph'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(buildJsonLd(page))
  }, [pathname])

  return null
}
