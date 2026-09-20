export const SITE = {
  origin: 'https://routino.ai',
  name: 'روتینو',
  nameEn: 'Routino',
  locale: 'fa_IR',
  language: 'fa',
  email: 'info@routino.ir',
  phone: '+989903760867',
  phoneDisplay: '۰۹۹۰۳۷۶۰۸۶۷',
  instagram: 'https://www.instagram.com/routino.studio/',
  address: 'کرج، بلوار انقلاب، فاز سوم گوهردشت، گلستان یکم، پلاک ۶ واحد ۲',
  locality: 'کرج',
  region: 'البرز',
  country: 'IR',
  hoursLabel: 'شنبه تا جمعه، ۱۰ صبح تا ۱۰ شب',
  opens: '10:00',
  closes: '22:00',
  logoPath: '/brand/routino-logo.png',
  defaultImage: '/images/home-hero.jpg',
  keywords: [
    'روتینو',
    'Routino',
    'استودیو روتینو',
    'استودیو فیلم‌برداری کرج',
    'ضبط پادکست کرج',
    'گوهردشت',
    'سلامت و سبک زندگی',
  ],
} as const

export type SeoPage = {
  path: string
  fileName: string
  title: string
  description: string
  shortTitle: string
  image: string
  imageAlt: string
  robots?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
}

export const seoPages: SeoPage[] = [
  {
    path: '/',
    fileName: 'index.html',
    title: 'روتینو | سلامت، ورزش و استودیو تولید محتوا در کرج',
    description:
      'روتینو برند سلامت، ورزش و سبک زندگی است. پادکست و محتوای قابل‌استفاده، به‌همراه استودیو حرفه‌ای فیلم‌برداری و ضبط پادکست در گوهردشت کرج.',
    shortTitle: 'صفحه اصلی',
    image: '/images/home-hero.jpg',
    imageAlt: 'سبک زندگی سالم روتینو؛ ورزش، خانه و شهر در یک قاب',
  },
  {
    path: '/studio',
    fileName: 'studio.html',
    title: 'اجاره استودیو فیلم‌برداری و پادکست در کرج | روتینو',
    description:
      'تعرفه شفاف، ماشین‌حساب آنلاین و رزرو استودیو روتینو در کرج. دوربین سینمایی سونی، صدای RØDE، نور NanLite و بیش از ۱۵ دکور برای فیلم‌برداری و پادکست.',
    shortTitle: 'استودیو',
    image: '/images/home-studio.jpg',
    imageAlt: 'ست تصویربرداری استودیو روتینو با دوربین، نور و دکور',
  },
  {
    path: '/podcast',
    fileName: 'podcast.html',
    title: 'ضبط پادکست حرفه‌ای در استودیو روتینو | کرج',
    description:
      'اتاق آکوستیک، میکروفن RØDE PodMic و Wireless Pro، کنسول RØDECaster و امکان پادکست تصویری در استودیو روتینو. رزرو و برآورد هزینه در صفحه استودیو.',
    shortTitle: 'پادکست',
    image: '/images/home-podcast.jpg',
    imageAlt: 'فضای ضبط پادکست روتینو با میکروفن و صندلی',
  },
  {
    path: '/about',
    fileName: 'about.html',
    title: 'درباره روتینو | برند سلامت، ورزش و سبک زندگی',
    description:
      'روتینو از فاصله بین دانستن و انجام‌دادن شروع شد. محتوای قابل‌اعتماد درباره سلامت و سبک زندگی، به‌همراه فضای تولید در استودیو روتینو.',
    shortTitle: 'درباره روتینو',
    image: '/images/home-philosophy.jpg',
    imageAlt: 'شروع روز با یک انتخاب کوچک؛ بستن بند کفش برای حرکت',
  },
  {
    path: '/contact',
    fileName: 'contact.html',
    title: 'تماس و آدرس استودیو روتینو در کرج | گوهردشت',
    description:
      'تماس با روتینو برای رزرو استودیو، بازدید و هماهنگی آفیش. آدرس: کرج، گوهردشت، گلستان یکم، پلاک ۶ واحد ۲. تلفن ۰۹۹۰۳۷۶۰۸۶۷ — شنبه تا جمعه ۱۰ تا ۲۲.',
    shortTitle: 'تماس با ما',
    image: '/images/home-studio.jpg',
    imageAlt: 'آدرس و فضای استودیو روتینو در کرج',
  },
]

export const notFoundSeo: SeoPage = {
  path: '/404',
  fileName: '404.html',
  title: 'صفحه پیدا نشد | روتینو',
  description: 'این مسیر در سایت روتینو وجود ندارد. به صفحه اصلی، استودیو یا تماس با ما برگردید.',
  shortTitle: 'صفحه پیدا نشد',
  image: '/images/home-hero.jpg',
  imageAlt: 'روتینو',
  robots: 'noindex, follow',
  noindex: true,
}

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '')
  return `${SITE.origin}${normalized}`
}

export function getSeoPage(pathname: string): SeoPage {
  const clean = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/'
  return seoPages.find((page) => page.path === clean) ?? notFoundSeo
}

export const studioFaqs = [
  {
    question: 'فرمول محاسبه تخفیف استودیو روتینو چگونه کار می‌کند؟',
    answer:
      'در پکیج‌های ۱، ۲ و ۳ دوربین، به‌ازای هر ۲ ساعت استفاده، ۲٫۵ درصد تخفیف روی کل فاکتور اعمال می‌گردد. برای لوکیشن خالی نیز نرخ ساعتی از ۶۵۰ هزار تومان در ساعت اول، به‌صورت خطی تا ۵۰۰ هزار تومان در ساعت دوازدهم کاهش می‌یابد.',
  },
  {
    question: 'آیا هزینه لوکیشن استودیو به پکیج‌های دوربین اضافه می‌شود؟',
    answer:
      'خیر؛ هزینه لوکیشن، دکورها و آکوستیک درون تعرفه پکیج دوربین محاسبه شده و هیچ هزینه پنهانی برای اجاره فضا دریافت نمی‌شود.',
  },
  {
    question: 'تجهیزات صدابرداری RØDE و نورهای NanLite چگونه در پکیج قرار می‌گیرند؟',
    answer:
      'می‌توانید در ماشین‌حساب میکروفن‌های پادکست و بی‌سیم، میکسر RØDECaster Pro II و نورهای NanLite را انتخاب کنید. این موارد امکانات استاندارد استودیو هستند و هزینه اضافی برای جلسه ندارند.',
  },
] as const
