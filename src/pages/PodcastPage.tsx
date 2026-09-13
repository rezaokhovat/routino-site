import { Link } from 'react-router-dom'

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

export function PodcastPage() {
  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-14 pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="max-w-3xl flex flex-col gap-5">
          <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
            خدمات پادکست برند روتینو
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
            ضبط پادکست در استودیو روتینو
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            در بخش استودیو برند روتینو، اتاق آکوستیک، میکروفن‌های RØDE و نور NanLite برای قسمت‌های صوتی،
            گفتگوی دونفره و پادکست تصویری آماده است. رزرو و تعرفه اجاره در صفحه استودیو انجام می‌شود.
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
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-[1240px] mx-auto px-gutter-lg grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] flex flex-col gap-3"
            >
              <span className="w-11 h-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              </span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">{item.title}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
