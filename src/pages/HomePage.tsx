import { Link } from 'react-router-dom'

const highlights = [
  {
    icon: 'videocam',
    title: 'استودیو فیلم‌برداری',
    text: 'رزرو لوکیشن، ماشین‌حساب تعرفه، برنامهٔ آفیش و نمونه خروجی‌ها.',
    to: '/studio',
    action: 'ورود به استودیو',
  },
  {
    icon: 'podcasts',
    title: 'ضبط پادکست',
    text: 'پادکست صوتی و تصویری با میکروفن‌های RØDE و کنسول RØDECaster.',
    to: '/podcast',
    action: 'صفحه پادکست',
  },
  {
    icon: 'info',
    title: 'درباره روتینو',
    text: 'فضا، تجهیزات و مسیر دسترسی استودیو در گوهردشت کرج.',
    to: '/about',
    action: 'بیشتر بدانید',
  },
]

export function HomePage() {
  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-16 pt-10">
        <div className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-brand-red/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-brand-amber/10 blur-2xl pointer-events-none" />
        <div className="relative max-w-[1240px] mx-auto px-gutter-lg">
          <div className="w-full max-w-3xl flex flex-col gap-6">
            <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
              استودیو تخصصی فیلم‌برداری و پادکست
            </span>
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero font-extrabold text-on-surface">
              روتینو؛ لوکیشن آماده برای ضبط حرفه‌ای
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              تعرفه، رزرو آفیش، فضای استودیو و نمونه ویدیوها را در صفحه استودیو ببینید. برای ضبط پادکست
              صوتی و تصویری هم تجهیزات برادکست آماده است.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/studio"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm text-headline-sm font-bold shadow-lg shadow-brand-red/30 hover:opacity-95 transition-all hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[20px]">movie</span>
                صفحه استودیو
              </Link>
              <Link
                to="/podcast"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm font-semibold shadow-sm hover:bg-surface-container transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
                ضبط پادکست
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pb-16">
        <div className="max-w-[1240px] mx-auto px-gutter-lg grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex flex-col gap-4 p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] hover:border-brand-red/40 hover:shadow-lg transition-all"
            >
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
              </span>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">{item.title}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item.text}</p>
              <span className="mt-auto font-headline-sm text-[15px] font-bold text-brand-red group-hover:gap-2 inline-flex items-center gap-1">
                {item.action}
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
