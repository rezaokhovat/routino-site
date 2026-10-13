import { Link } from 'react-router-dom'
import { BusinessSupportForm } from '../packages/BusinessSupportForm'
import { packagesPath } from '../packages/offerPackages'

const steps = [
  {
    title: 'مشخصات را می‌فرستید',
    text: 'عنوان شغلی، شماره همراه و آدرس اینستاگرام را ثبت می‌کنید تا با شما تماس بگیریم.',
    icon: 'edit_note',
  },
  {
    title: 'برای ضبط می‌آیید',
    text: 'هماهنگ می‌کنیم به استودیو بیایید و محتوا را ضبط کنیم.',
    icon: 'videocam',
  },
  {
    title: '۴ تا ۵ ریلز می‌سازیم',
    text: 'ویدیوها را آماده می‌کنیم و در صفحه اینستاگرام خودتان پخش می‌کنیم.',
    icon: 'movie',
  },
  {
    title: 'اگر دیده شد، هزینه معقول',
    text: 'اگر ریلزها دید گرفتند و صفحه به اکسپلور رسید، هزینه معقول تهیه ویدیوها را می‌گیریم. اگر این اتفاق نیفتاد، ساخت ویدیوها برای شما رایگان بوده است.',
    icon: 'flag',
  },
]

function stepNumber(index: number) {
  return String(index + 1)
    .padStart(2, '0')
    .replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)] ?? digit)
}

function StepStation({
  step,
  index,
  className,
}: {
  step: (typeof steps)[number]
  index: number
  className?: string
}) {
  return (
    <article
      className={`relative rounded-2xl sm:rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] p-4 sm:p-5 flex flex-col gap-2 ${className ?? ''}`}
    >
      <div className="flex items-center gap-3">
        <span className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-red to-brand-orange text-on-primary font-stat-counter text-[18px] font-extrabold flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/25">
          {stepNumber(index)}
        </span>
        <span className="w-10 h-10 rounded-xl bg-surface-container text-brand-red flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">{step.icon}</span>
        </span>
      </div>
      <h3 className="font-headline-sm text-[16px] sm:text-headline-sm font-bold text-on-surface">{step.title}</h3>
      <p className="font-body-md text-[14px] leading-6 sm:text-body-md text-on-surface-variant">{step.text}</p>
    </article>
  )
}

const gallery = [
  {
    src: '/images/studio-location-02.jpg',
    alt: 'دکور نارنجی استودیو روتینو با صندلی و قفسه',
    imgClass: 'object-center',
  },
  {
    src: '/images/studio-location-03.jpg',
    alt: 'میز کار استودیو روتینو با دیوار آبی و لپ‌تاپ',
    imgClass: 'object-center',
  },
  {
    src: '/images/studio-location-04.jpg',
    alt: 'صندلی و میکروفن RØDE در استودیو روتینو',
    imgClass: 'object-center',
  },
  {
    src: '/images/studio-location-05.jpg',
    alt: 'دکور سبز استودیو روتینو با آباژور و میز گرد',
    imgClass: 'object-center',
  },
]

function LocationPhoto({
  src,
  alt,
  imgClass,
  eager,
  className,
}: {
  src: string
  alt: string
  imgClass?: string
  eager?: boolean
  className?: string
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl sm:rounded-[1.75rem] aspect-[9/16] bg-surface-container-low ${className ?? ''}`}
    >
      <img
        src={src}
        alt={alt}
        width={1080}
        height={1920}
        fetchPriority={eager ? 'high' : undefined}
        loading={eager ? undefined : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClass ?? ''}`}
      />
    </figure>
  )
}

export function BusinessSupportPage() {
  return (
    <main className="w-full pt-28 bg-surface overflow-x-hidden">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pt-6 sm:pt-10 pb-6 sm:pb-8">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-gutter-lg">
          <Link to={packagesPath} className="self-start text-[13px] font-bold text-brand-red min-h-11 inline-flex items-center">
            بازگشت به پکیج‌ها
          </Link>
          <h1 className="sr-only">حمایت از کسب و کارها</h1>
        </div>
      </section>

      <section className="pb-10 sm:pb-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-gutter-lg">
          <h2 className="font-headline-lg text-[22px] sm:text-[24px] md:text-[30px] font-extrabold text-on-surface mb-4 sm:mb-6">
            فضای ضبط ریلز
          </h2>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory overscroll-x-contain pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
            {gallery.map((item) => (
              <div
                key={item.src}
                className="w-[42vw] min-w-[140px] max-w-[180px] shrink-0 snap-start lg:w-auto lg:max-w-none"
              >
                <LocationPhoto src={item.src} alt={item.alt} imgClass={item.imgClass} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-gutter-lg">
          <h2 className="font-headline-lg text-[22px] sm:text-[24px] md:text-[30px] font-extrabold text-on-surface mb-4 sm:mb-6">
            مسیر طرح
          </h2>
          <ol className="md:hidden relative flex flex-col gap-5">
            <span
              aria-hidden
              className="absolute top-6 bottom-6 right-[1.4rem] w-0.5 rounded-full bg-gradient-to-b from-brand-red to-brand-orange"
            />
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex items-start gap-3">
                <span className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-brand-red to-brand-orange text-on-primary font-stat-counter text-[16px] font-extrabold flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/25">
                  {stepNumber(index)}
                </span>
                <article className="min-w-0 flex-1 rounded-2xl border border-outline-variant/40 bg-[#fcfaf7] p-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-brand-red">{step.icon}</span>
                    <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">{step.title}</h3>
                  </div>
                  <p className="font-body-md text-[14px] leading-6 text-on-surface-variant">{step.text}</p>
                </article>
              </li>
            ))}
          </ol>

          <ol className="relative hidden md:grid md:grid-cols-2 gap-x-24 gap-y-16 px-4 py-6">
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-[8%] hidden md:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="routino-plan-path" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d91f40" />
                  <stop offset="100%" stopColor="#eb4e11" />
                </linearGradient>
              </defs>
              <path
                d="M 82 16 C 48 16 48 16 18 16 C 6 16 6 38 18 50 C 6 62 6 84 18 84 C 48 84 48 84 82 84"
                fill="none"
                stroke="url(#routino-plan-path)"
                strokeWidth="1.6"
                strokeDasharray="3 4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={
                  index === 2 ? 'md:col-start-2 md:row-start-2' : index === 3 ? 'md:col-start-1 md:row-start-2' : ''
                }
              >
                <StepStation step={step} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-gutter-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <BusinessSupportForm />
          </div>
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-32">
            <LocationPhoto
              src="/images/studio-location-03.jpg"
              alt="میز کار استودیو روتینو با دیوار آبی"
              imgClass="object-center"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
