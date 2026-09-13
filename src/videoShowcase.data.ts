export type ShowcaseVideo = {
  id: string
  title: string
  subtitle: string
  src: string
  poster: string
}

/** نمونه‌ویدیوهای نمایشی استودیو — با فایل‌های واقعی خودتان جایگزین کنید */
export const showcaseVideos: ShowcaseVideo[] = [
  {
    id: 'v1',
    title: 'پادکست تصویری دو نفره',
    subtitle: 'Sony FX3 • RØDE Wireless Pro • NanLite FC',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: '/images/0.jpg',
  },
  {
    id: 'v2',
    title: 'دوره آموزشی آنلاین',
    subtitle: 'تک‌دوربین سینمایی • کالرگرید حرفه‌ای',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: '/images/1.jpg',
  },
  {
    id: 'v3',
    title: 'میزگرد و گفتگوی گروهی',
    subtitle: '۳ دوربین فول‌ست • سوئیچ زنده',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: '/images/2.png',
  },
  {
    id: 'v4',
    title: 'ریلز و محتوای شبکه‌های اجتماعی',
    subtitle: 'نور RGB • خروجی عمودی و افقی',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster: '/images/3.jpg',
  },
  {
    id: 'v5',
    title: 'برندینگ و معرفی محصول',
    subtitle: 'سینمایی ۴K • صدای برادکست RØDE',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: '/images/4.jpg',
  },
]
