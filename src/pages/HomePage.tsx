import { Link } from 'react-router-dom'
import { HomeFutureRoadmap } from '../home/HomeFutureRoadmap'
import { RoutinoLogo } from '../RoutinoLogo'

const todayProducts = [
  {
    eyebrow: 'رسانه روتینو',
    title: 'پادکست و روتینو پلاس',
    text: 'گفت‌وگوها و ویدیوهایی درباره سلامت، ورزش، ذهن و سبک زندگی؛ ساده، علمی و قابل‌استفاده در زندگی واقعی.',
    to: '/podcast',
    action: 'مشاهده برنامه‌ها',
    image: '/images/home-podcast.jpg',
    imageAlt: 'فضای ضبط پادکست روتینو با میکروفن و صندلی سبز',
    imageClass: 'object-[left_center]',
  },
  {
    eyebrow: 'استودیو روتینو',
    title: 'فضای حرفه‌ای تولید محتوا',
    text: 'بیش از ۱۵ دکور متنوع، تجهیزات کامل تصویربرداری و فضای آماده برای تولید پادکست، ریلز و ویدیوهای حرفه‌ای.',
    to: '/studio',
    action: 'مشاهده استودیو',
    image: '/images/home-studio.jpg',
    imageAlt: 'ست تصویربرداری استودیو روتینو با دوربین، نور و دکور',
    imageClass: 'object-[left_center]',
  },
]

export function HomePage() {
  return (
    <main className="w-full bg-surface">
      {/* Hero — full-bleed studio atmosphere */}
      <section className="relative w-full bg-brand-charcoal overflow-hidden pt-28">
        <div className="relative w-full min-h-[460px] max-h-[70vh] aspect-video">
        <img
          src="/images/home-hero.jpg"
          alt="سبک زندگی سالم روتینو؛ ورزش، خانه و شهر در یک قاب"
          className="absolute inset-0 h-full w-full object-cover object-[left_top] origin-top-left home-hero-ken"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/25 to-black/10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-brand-charcoal/80 via-brand-charcoal/35 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-end">
        <div className="max-w-[1240px] w-full mx-auto px-gutter-lg pt-6 pb-10 md:pb-14">
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
                زندگی بهتر، از انتخاب‌های کوچک هر روز شروع می‌شود.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
                در روتینو معتقدیم برای بهتر زندگی کردن، همیشه به تغییرهای بزرگ و ناگهانی نیاز نداریم. گاهی یک
                خواب منظم‌تر، چند دقیقه تحرک بیشتر یا یک انتخاب آگاهانه می‌تواند شروع یک مسیر تازه باشد.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                ما تلاش می‌کنیم دانش سلامت، ورزش و سبک زندگی را به راهکارهای ساده و قابل‌اجرا تبدیل کنیم؛ تا هر
                روز بتوانید یک قدم کوچک اما مؤثر برای خودتان بردارید.
              </p>
            </div>
            <div className="lg:col-span-7 relative home-reveal home-reveal-delay-2">
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[1.75rem]">
                <img
                  src="/images/home-philosophy.jpg"
                  alt="شروع روز با یک انتخاب کوچک؛ بستن بند کفش برای حرکت"
                  className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 hover:scale-[1.03]"
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
                روتینو امروز
              </span>
              <h2 className="font-headline-lg text-[26px] md:text-[32px] font-extrabold text-on-surface">
                روتینو امروز از اینجا شروع می‌شود
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              محتوای قابل‌اعتماد و فضای حرفه‌ای تولید؛ دو مسیری که امروز با آن‌ها تجربه روتینو را می‌سازیم.
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
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${item.imageClass ?? ''}`}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/55 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative z-10 p-6 md:p-8 flex flex-col gap-3">
                  <span className="self-start px-2.5 py-1 rounded-full bg-white/15 text-[12px] font-bold text-on-primary/90">
                    {item.eyebrow}
                  </span>
                  <h3 className="font-headline-md text-[22px] md:text-headline-md font-bold text-on-primary">
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
      <section className="relative w-full min-h-[220px] md:min-h-[300px] overflow-hidden mb-4 bg-[#0b0204]">
        <img
          src="/images/home-future-bridge.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-contain md:object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-gutter-lg h-full min-h-[220px] md:min-h-[300px] flex items-center justify-center text-center">
          <div className="max-w-2xl home-reveal">
            <p className="font-headline-md text-[20px] md:text-[28px] font-extrabold text-on-primary leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
              آنچه امروز می‌بینید، فقط شروع ساختن یک اکوسیستم بزرگ‌تر است.
            </p>
            <p className="mt-3 font-body-md text-body-md text-on-primary/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
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
