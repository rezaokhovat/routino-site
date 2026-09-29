import { Link } from 'react-router-dom'
import { BusinessSupportForm } from '../packages/BusinessSupportForm'
import { packagesPath } from '../packages/offerPackages'

const steps = [
  {
    title: 'مشخصات را می‌فرستید',
    text: 'عنوان شغلی، شماره همراه و آدرس اینستاگرام را وارد کنید تا با شما تماس بگیریم.',
  },
  {
    title: 'برای ضبط می‌آیید',
    text: 'هماهنگ می‌کنیم به استودیو بیایید و محتوا را ضبط کنیم.',
  },
  {
    title: '۴ تا ۵ ریلز می‌سازیم',
    text: 'ویدیوها را آماده می‌کنیم و در صفحه اینستاگرام خودتان پخش می‌کنیم.',
  },
  {
    title: 'اگر دیده شد، هزینه معقول',
    text: 'اگر ریلزها دید گرفتند و صفحه به اکسپلور رسید، هزینه معقول تهیه ویدیوها را می‌گیریم. اگر این اتفاق نیفتاد، ساخت ویدیوها برای شما رایگان بوده است.',
  },
]

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
}: {
  src: string
  alt: string
  imgClass?: string
  eager?: boolean
}) {
  return (
    <figure className="overflow-hidden rounded-[1.75rem] aspect-[9/16] bg-surface-container-low">
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
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-12 pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg flex flex-col-reverse lg:flex-row lg:items-start gap-8 lg:gap-12">
          <div className="flex-1 flex flex-col gap-5">
            <Link to={packagesPath} className="self-start text-[13px] font-bold text-brand-red">
              بازگشت به پکیج‌ها
            </Link>
            <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
              طرح استودیو روتینو
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
              حمایت از کسب و کارها
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              اگر کسب‌وکار یا پیج اینستاگرام دارید و می‌خواهید با ویدیو دیده شوید، شما را به استودیو دعوت
              می‌کنیم. چهار تا پنج ریلز برایتان می‌سازیم و در صفحه خودتان پخش می‌کنیم.
            </p>
            <a
              href="#request"
              className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold shadow-lg shadow-brand-red/30 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              ثبت مشخصات
            </a>
            <div className="rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] p-5 md:p-6">
              <p className="font-headline-sm text-[15px] font-bold text-on-surface mb-2">شرط طرح</p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                اگر ریلزها جواب دادند، ویو گرفتند و صفحه به اکسپلور رسید، برای تهیه ویدیوها هزینه معقولی
                می‌گیریم. اگر این اتفاق نیفتاد، ویدیوها رایگان برای شما ساخته شده‌اند.
              </p>
            </div>
          </div>
          <div className="w-full max-w-[280px] mx-auto lg:mx-0 shrink-0">
              <LocationPhoto
                src="/images/studio-location-01.jpg"
                alt="لوکیشن استودیو روتینو؛ میز ضبط با بازوی میکروفن RØDE"
                imgClass="object-[84%_center]"
                eager
              />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <h2 className="font-headline-lg text-[24px] md:text-[30px] font-extrabold text-on-surface mb-6">
            فضای ضبط ریلز
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {gallery.map((item) => (
              <LocationPhoto key={item.src} src={item.src} alt={item.alt} imgClass={item.imgClass} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <h2 className="font-headline-lg text-[24px] md:text-[30px] font-extrabold text-on-surface mb-6">
            مسیر طرح
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="p-6 rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] flex flex-col gap-2"
              >
                <span className="text-brand-red font-stat-counter text-[28px] font-extrabold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{step.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1240px] mx-auto px-gutter-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <BusinessSupportForm />
          </div>
          <div className="lg:col-span-4 lg:sticky lg:top-32 max-w-md mx-auto lg:max-w-none">
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
