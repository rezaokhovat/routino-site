import { SITE, absoluteUrl, studioFaqs, type SeoPage } from './config.ts'

function businessNode() {
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE.origin}/#business`,
    name: `${SITE.name} | ${SITE.nameEn}`,
    alternateName: [SITE.name, SITE.nameEn, 'استودیو روتینو', 'Routino Studio'],
    url: SITE.origin,
    image: [absoluteUrl(SITE.defaultImage), absoluteUrl('/images/home-studio.jpg')],
    logo: absoluteUrl(SITE.logoPath),
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [SITE.instagram],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'گلستان یکم، پلاک ۶ واحد ۲، فاز سوم گوهردشت، بلوار انقلاب',
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    areaServed: [
      { '@type': 'City', name: 'کرج' },
      { '@type': 'AdministrativeArea', name: 'البرز' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: SITE.opens,
      closes: SITE.closes,
    },
  }
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.origin}/#website`,
    url: SITE.origin,
    name: SITE.name,
    inLanguage: 'fa-IR',
    publisher: { '@id': `${SITE.origin}/#business` },
  }
}

function breadcrumbNode(page: SeoPage) {
  const items: { '@type': 'ListItem'; position: number; name: string; item: string }[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: SITE.name,
      item: SITE.origin + '/',
    },
  ]
  if (page.path !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: page.shortTitle,
      item: absoluteUrl(page.path),
    })
  }
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: items,
  }
}

export function buildJsonLd(page: SeoPage) {
  const canonical = absoluteUrl(page.path === '/404' ? '/' : page.path)
  const graph: Record<string, unknown>[] = [
    businessNode(),
    websiteNode(),
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: 'fa-IR',
      isPartOf: { '@id': `${SITE.origin}/#website` },
      about: { '@id': `${SITE.origin}/#business` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: absoluteUrl(page.image),
      },
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
    },
    breadcrumbNode(page),
  ]

  if (page.path === '/studio') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: studioFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  if (page.path === '/contact') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${canonical}#contact`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE.origin}/#website` },
    })
  }

  if (page.path === '/about') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${canonical}#about`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE.origin}/#website` },
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
