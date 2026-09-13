export type RoadmapStatus = 'now' | 'building' | 'future'

export type RoadmapStep = {
  number: string
  status: RoadmapStatus
  statusLabel: string
  accent?: string
  title: string
  heading?: string
  description: string[]
  micro?: string
  items?: string[]
  cta?: { label: string; to: string }
  emphasis?: boolean
}

export const roadmapSteps: RoadmapStep[] = [
  {
    number: '01',
    status: 'now',
    statusLabel: 'NOW',
    accent: 'MEDIA — KNOW',
    title: 'Routino Media',
    description: [
      'همه‌چیز از محتوا شروع شد.',
      'پادکست روتینو و Routino Plus جایی هستند که درباره سلامت، ورزش، تغذیه، ذهن، رفتار، تکنولوژی و سبک زندگی حرف می‌زنیم.',
      'هدف فقط انتقال اطلاعات نیست. می‌خواهیم موضوعات پیچیده را به چیزی تبدیل کنیم که بتوان از آن در زندگی واقعی استفاده کرد.',
    ],
    items: [
      'Routino Podcast',
      'Routino Plus',
      'Reels',
      'Video',
      'Health & Lifestyle Content',
    ],
  },
  {
    number: '02',
    status: 'now',
    statusLabel: 'NOW',
    accent: 'STUDIO — CREATE',
    title: 'Routino Studio',
    description: [
      'بعد از ساخت محتوا، نوبت ساختن فضایی برای تولید محتوا بود.',
      'Routino Studio فضای حرفه‌ای تولید Podcast، Video Podcast، Reels، Interview و محتوای برندهاست.',
      'بیش از ۱۵ دکور، تجهیزات تصویربرداری، نورپردازی و صدابرداری در اختیار تولیدکننده‌های محتوا و کسب‌وکارها قرار می‌گیرد.',
    ],
    cta: { label: 'مشاهده Routino Studio', to: '/studio' },
  },
  {
    number: '03',
    status: 'building',
    statusLabel: 'IN DEVELOPMENT',
    accent: 'APP — ACT',
    title: 'Routino App',
    heading: 'سلامتی، این بار شخصی‌تر.',
    description: [
      'قدم بعدی روتینو، ساختن یک تجربه دیجیتال در حوزه سلامته.',
      'Routino App قراره هسته دیجیتال اکوسیستم روتینو باشه؛ جایی که محتوا، سلامت، ورزش و سبک زندگی به یک تجربه یکپارچه نزدیک‌تر می‌شن.',
      'هدف اینه که روتینو فقط چیزی نباشه که تماشاش می‌کنید؛ بلکه به چیزی تبدیل بشه که در مسیر ساختن روتین‌های بهتر همراهتون باشه.',
    ],
    micro: 'از دیدن و یاد گرفتن، به انجام دادن.',
    emphasis: true,
  },
  {
    number: '04',
    status: 'future',
    statusLabel: 'FUTURE',
    accent: 'CAFE — CONNECT',
    title: 'Routino Cafe',
    heading: 'جایی برای مکث، گفتگو و یک انتخاب بهتر.',
    description: [
      'کافه روتینو قراره تجربه فیزیکی متفاوتی از برند باشه؛ فضایی برای ملاقات، گفتگو، کار، استراحت و بخشی از سبک زندگی‌ای که روتینو درباره‌ش حرف می‌زنه.',
    ],
  },
  {
    number: '05',
    status: 'future',
    statusLabel: 'FUTURE',
    accent: 'GYM — MOVE',
    title: 'Routino Gym',
    heading: 'از حرف زدن درباره حرکت، به حرکت کردن.',
    description: [
      'ورزش یکی از پایه‌های اصلی روتینوئه و در ادامه مسیر می‌خواهیم این بخش از برند رو از محتوا وارد تجربه واقعی کنیم.',
      'Routino Gym قراره فضایی باشه که تمرین و سبک زندگی فعال، بخشی از تجربه روزمره روتینو بشه.',
    ],
  },
  {
    number: '06',
    status: 'future',
    statusLabel: 'FUTURE',
    accent: 'WEAR — LIVE',
    title: 'Routino Wear',
    heading: 'روتینو، بیرون از صفحه.',
    description: [
      'در ادامه مسیر، هویت روتینو وارد محصولاتی می‌شه که بخشی از زندگی روزمره و ورزش مخاطب هستند.',
      'Routino Wear مسیر ما برای ساخت لباس‌ها و پوشاک ورزشی با هویت خود روتینو خواهد بود.',
    ],
  },
]
