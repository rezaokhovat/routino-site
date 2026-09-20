import { Link } from 'react-router-dom'
import { studioAddress } from '../studioLocation'

const features = [
  {
    icon: 'mic',
    title: 'صدای برادکست',
    text: 'میکروفن‌های RØDE PodMic و Wireless Pro برای گفتگوی تک‌نفره و دونفره.',
  },
  {
    icon: 'tune',
    title: 'کنسول RØDECaster',
    text: 'میکس زنده، افکت و ضبط مولتی‌ترک بدون نیاز به آوردن تجهیزات جداگانه.',
  },
  {
    icon: 'videocam',
    title: 'پادکست تصویری',
    text: 'امکان ضبط همزمان تصویر سینمایی در کنار صدا، مناسب کاور و تیزر قسمت‌ها.',
  },
]

const steps = [
  {
    title: 'اتاق آماده ضبط',
    text: 'فضای آکوستیک استودیو روتینو در گوهردشت کرج برای گفت‌وگوی یک‌نفره و دونفره آماده است.',
  },
  {
    title: 'صدا و نور استاندارد',
    text: 'میکروفن RØDE، میکسر RØDECaster Pro II و نور NanLite در پکیج‌های دوربین بدون هزینه جداگانه ارائه می‌شود.',
  },
  {
    title: 'رزرو از روی تعرفه شفاف',
    text: 'ساعت جلسه را در ماشین‌حساب استودیو مشخص کنید و همان‌جا برآورد هزینه را ببینید.',
  },
]

export function PodcastPage() {
  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-14 pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 max-w-3xl flex flex-col gap-5">
              <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
                ضبط پادکست در کرج
              </span>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
                ضبط پادکست حرفه‌ای در استودیو روتینو
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                در استودیو روتینو می‌توانید پادکست صوتی، گفت‌وگوی دونفره و پادکست تصویری ضبط کنید. اتاق
                آکوستیک، میکروفن‌های RØDE و نور NanLite آماده‌اند؛ رزرو و تعرفه اجاره در صفحه استودیو انجام
                می‌شود.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/studio#calculator"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold shadow-lg shadow-brand-red/30 hover:opacity-95"
                >
                  رزرو و برآورد هزینه
                </Link>
                <Link
                  to="/studio#podcast"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm font-semibold shadow-sm hover:bg-surface-container"
                >
                  نمونه ویدیوها
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <img
                src="/images/home-podcast.jpg"
                alt="فضای ضبط پادکست روتینو با میکروفن و صندلی"
                width={1024}
                height={682}
                fetchPriority="high"
                decoding="async"
                className="w-full rounded-[1.75rem] object-cover object-[left_center] aspect-[16/11]"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-[1240px] mx-auto px-gutter-lg grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((item) => (
            <article
              key={item.title}
              className="p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] flex flex-col gap-3"
            >
              <span className="w-11 h-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              </span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">{item.title}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <h2 className="font-headline-lg text-[24px] md:text-[30px] font-extrabold text-on-surface mb-6">
            مسیر ضبط یک قسمت در روتینو
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((item, index) => (
              <li
                key={item.title}
                className="p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] flex flex-col gap-2"
              >
                <span className="text-brand-red font-stat-counter text-[28px] font-extrabold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="pb-20">
        <div className="max-w-[1240px] mx-auto px-gutter-lg rounded-[1.75rem] bg-surface-container-low px-6 py-10 md:px-10">
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-3">
            کجا ضبط می‌کنید؟
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-3xl mb-5">
            استودیو روتینو در {studioAddress} است و شنبه تا جمعه از ۱۰ صبح تا ۱۰ شب برای رزرو فعال است.
            پرسش‌های مربوط به تخفیف ساعتی و تجهیزات رایگان را در بخش پرسش‌های متداول استودیو ببینید.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold"
            >
              آدرس و تماس
            </Link>
            <Link
              to="/studio#about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm font-semibold border border-outline-variant/40"
            >
              پرسش‌های متداول استودیو
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
