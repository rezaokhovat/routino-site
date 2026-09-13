import { Link } from 'react-router-dom'
import { HomeFutureRoadmap } from '../home/HomeFutureRoadmap'
import { RoutinoLogo } from '../RoutinoLogo'

const todayProducts = [
  {
    eyebrow: 'MEDIA',
    title: 'Routino Podcast & Plus',
    text: 'محتوای سلامت، ورزش، ذهن و سبک زندگی — جایی که دانش به زبان ساده و قابل‌استفاده می‌رسد.',
    to: '/podcast',
    action: 'مشاهده پادکست',
    image: '/images/3.jpg',
    imageAlt: 'ضبط محتوا در فضای استودیو روتینو',
  },
  {
    eyebrow: 'STUDIO',
    title: 'Routino Studio',
    text: 'فضای حرفه‌ای تولید پادکست، ویدیو و محتوای برند با بیش از ۱۵ دکور و تجهیزات کامل.',
    to: '/studio',
    action: 'ورود به استودیو',
    image: '/images/0.jpg',
    imageAlt: 'ست پادکست و فیلم‌برداری استودیو روتینو',
  },
]

export function HomePage() {
  return (
    <main className="w-full bg-surface">
      {/* Hero — full-bleed studio atmosphere */}
      <section className="relative min-h-[min(92vh,920px)] flex flex-col justify-end overflow-hidden">
        <img
          src="/images/2.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_20%] home-hero-ken"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/75 to-brand-charcoal/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-brand-charcoal/40"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1240px] w-full mx-auto px-gutter-lg pt-32 pb-14 md:pb-20">
          <div className="max-w-2xl flex flex-col gap-5 home-reveal home-reveal-delay-1">
            <RoutinoLogo to={false} height={72} className="self-start" />
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero font-extrabold text-on-primary drop-shadow-sm">
              روتین‌های کوچک. تغییرهای بزرگ.
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary/85 max-w-xl leading-relaxed">
              روتینو برندی حول سلامت، ورزش، Performance و سبک زندگی است — امروز با محتوا و استودیو، فردا با
              اکوسیستمی کامل‌تر.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#today"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm text-headline-sm font-bold shadow-lg shadow-brand-red/40 hover:opacity-95 transition-all hover:-translate-y-0.5"
              >
                آنچه امروز داریم
              </a>
              <a
                href="#future"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/25 text-on-primary font-headline-sm text-headline-sm font-semibold backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                مسیر آینده
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — image + text composition */}
      <section className="w-full py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 home-reveal">
              <span className="inline-flex px-3 py-1 rounded-full bg-brand-red/10 text-brand-red font-label-badge text-label-badge font-bold mb-4">
                فلسفه روتینو
              </span>
              <h2 className="font-headline-lg text-[26px] md:text-[34px] font-extrabold text-on-surface mb-4 leading-snug">
                کمک به ساختن زندگی بهتر، از طریق روتین‌های بهتر.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                محتوا، فضا، تکنولوژی و تجربه فیزیکی — همه قطعات یک اکوسیستم واحد هستند، نه کسب‌وکارهای جدا از
                هم.
              </p>
            </div>
            <div className="lg:col-span-7 relative home-reveal home-reveal-delay-2">
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[1.75rem]">
                <img
                  src="/images/4.jpg"
                  alt="فضای ضبط و گفت‌وگو در استودیو روتینو"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-brand-charcoal/25 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute -bottom-4 -start-3 md:-start-6 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-surface rotate-[-3deg] hidden sm:block">
                <img
                  src="/images/1.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today — photo-led product entries */}
      <section id="today" className="w-full pb-20 scroll-mt-28">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 home-reveal">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 font-label-badge text-label-badge font-bold mb-3">
                امروز فعال است
              </span>
              <h2 className="font-headline-lg text-[26px] md:text-[32px] font-extrabold text-on-surface">
                محصولات و خدمات فعلی روتینو
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Podcast، Routino Plus و Routino Studio — نقطه‌های شروع همین مسیر.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {todayProducts.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative overflow-hidden rounded-[1.75rem] min-h-[340px] md:min-h-[400px] flex flex-col justify-end home-reveal ${
                  index === 1 ? 'home-reveal-delay-2' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/55 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative z-10 p-6 md:p-8 flex flex-col gap-3">
                  <span
                    className="self-start text-[11px] font-bold tracking-[0.14em] text-on-primary/70 uppercase"
                    dir="ltr"
                  >
                    {item.eyebrow}
                  </span>
                  <h3
                    className="font-headline-md text-[22px] md:text-headline-md font-bold text-on-primary"
                    dir="ltr"
                  >
                    {item.title}
                  </h3>
                  <p className="font-body-md text-[15px] text-on-primary/80 leading-relaxed max-w-md">
                    {item.text}
                  </p>
                  <span className="mt-1 font-headline-sm text-[15px] font-bold text-brand-orange inline-flex items-center gap-1">
                    {item.action}
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
                      chevron_left
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visual bridge into future */}
      <section className="relative w-full min-h-[280px] md:min-h-[340px] overflow-hidden mb-4">
        <img
          src="/images/0.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-charcoal/70" aria-hidden="true" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-gutter-lg h-full min-h-[280px] md:min-h-[340px] flex items-center justify-center text-center">
          <div className="max-w-2xl home-reveal">
            <p className="font-headline-md text-[20px] md:text-[28px] font-extrabold text-on-primary leading-snug">
              آنچه امروز می‌بینید، فقط شروع ساختن یک اکوسیستم بزرگ‌تر است.
            </p>
            <p className="mt-3 font-body-md text-body-md text-on-primary/75">
              در ادامه، مسیر آینده برند روتینو را ببینید.
            </p>
          </div>
        </div>
      </section>

      <HomeFutureRoadmap />

      {/* Closing CTA with atmosphere */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/images/3.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-brand-red/95 via-brand-red/90 to-brand-orange/95"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1240px] mx-auto px-gutter-lg py-14 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-on-primary">
            <div className="max-w-xl">
              <h2 className="font-headline-lg text-[24px] md:text-[30px] font-extrabold mb-2">
                از همین امروز شروع کنید
              </h2>
              <p className="font-body-md text-body-md text-on-primary/90 leading-relaxed">
                محتوای پادکست را دنبال کنید یا برای تولید در Routino Studio رزرو کنید — قدم اول اکوسیستم
                همین‌جاست.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/podcast"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-on-primary text-brand-charcoal font-headline-sm font-bold hover:bg-surface-container-lowest transition-colors"
              >
                پادکست روتینو
              </Link>
              <Link
                to="/studio"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-charcoal/25 border border-white/25 text-on-primary font-headline-sm font-bold hover:bg-brand-charcoal/40 transition-colors"
              >
                Routino Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
