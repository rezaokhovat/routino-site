import { SITE, absoluteUrl, seoPages, type SeoPage } from './config.ts'
import { buildJsonLd } from './jsonLd.ts'

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function buildHeadTags(page: SeoPage) {
  const canonical = absoluteUrl(page.path === '/404' ? '/' : page.path)
  const image = absoluteUrl(page.image)
  const robots = page.robots ?? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const jsonLd = JSON.stringify(buildJsonLd(page)).replace(/</g, '\\u003c')

  const tags = [
    `<title>${escapeAttr(page.title)}</title>`,
    `<meta name="description" content="${escapeAttr(page.description)}" />`,
    `<meta name="keywords" content="${escapeAttr(SITE.keywords.join(', '))}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="googlebot" content="${robots}" />`,
    `<meta name="author" content="${escapeAttr(`${SITE.name} (${SITE.nameEn})`)}" />`,
    `<meta name="language" content="fa" />`,
    `<meta name="geo.region" content="IR" />`,
    `<meta name="geo.placename" content="${escapeAttr(SITE.locality)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hrefLang="fa-IR" href="${canonical}" />`,
    `<link rel="alternate" hrefLang="x-default" href="${canonical}" />`,
    `<meta property="og:type" content="${page.ogType ?? 'website'}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${escapeAttr(page.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(page.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json" id="jsonld-graph">${jsonLd}</script>`,
  ]

  return tags.join('\n    ')
}

export function buildSitemapXml(lastmod: string) {
  const urls = seoPages
    .filter((page) => !page.noindex)
    .map((page) => {
      const loc = absoluteUrl(page.path)
      const priority = page.path === '/' ? '1.0' : page.path === '/studio' ? '0.9' : '0.8'
      const changefreq = page.path === '/' || page.path === '/studio' ? 'weekly' : 'monthly'
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${absoluteUrl(page.image)}</image:loc>
      <image:title>${escapeAttr(page.shortTitle)}</image:title>
      <image:caption>${escapeAttr(page.imageAlt)}</image:caption>
    </image:image>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
}
