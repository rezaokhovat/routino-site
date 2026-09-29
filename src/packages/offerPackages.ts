export type OfferPackage = {
  slug: string
  title: string
  teaser?: string
  seoDescription?: string
  image?: string
  imageAlt?: string
  /** اگر خالی باشد، صفحهٔ جزئیات در انتظار متن می‌ماند */
  body?: string
}

export const packagesPath = '/studio/packages'

export const offerPackages: OfferPackage[] = [
  {
    slug: 'business-support',
    title: 'حمایت از کسب و کارها',
    teaser: '۴ تا ۵ ریلز برای پیج اینستاگرام شما؛ اگر دیده شد هزینه می‌گیریم، اگر نه رایگان است.',
    seoDescription:
      'طرح حمایت از کسب‌وکارها در استودیو روتینو: چهار تا پنج ریلز برای اینستاگرام شما. اگر ویدیوها دیده شدند هزینه معقول می‌گیریم؛ اگر نه، ساخت ویدیو رایگان است. مشخصات را بفرستید تا تماس بگیریم.',
    image: '/images/studio-location-01.jpg',
    imageAlt: 'میز ضبط استودیو روتینو با پرده و لپ‌تاپ',
  },
]

export const jobTitles = [
  'پزشک و کلینیک',
  'دندانپزشک',
  'مربی ورزش و باشگاه',
  'کافه و رستوران',
  'فروشگاه',
  'خدمات زیبایی',
  'مشاور املاک',
  'وکیل و خدمات حقوقی',
  'آموزشگاه',
  'تولید محتوا و پیج اینستاگرام',
  'سایر',
] as const

export function getOfferPackage(slug: string | undefined) {
  if (!slug) return undefined
  return offerPackages.find((item) => item.slug === slug)
}

export function packageDetailPath(slug: string) {
  return `${packagesPath}/${slug}`
}
