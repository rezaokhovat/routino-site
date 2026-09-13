export const siteNav = [
  { to: '/', label: 'صفحه اصلی', end: true },
  { to: '/studio', label: 'استودیو' },
  { to: '/podcast', label: 'پادکست' },
  { to: '/about', label: 'درباره روتینو' },
  { to: '/contact', label: 'تماس با ما' },
] as const

export const pageTitles: Record<string, string> = {
  '/': 'روتینو',
  '/studio': 'استودیو | روتینو',
  '/podcast': 'پادکست | روتینو',
  '/about': 'درباره روتینو | روتینو',
  '/contact': 'تماس با ما | روتینو',
}
