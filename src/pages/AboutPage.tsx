import { Link } from 'react-router-dom'
import {
  studioAddress,
  studioMapsDirUrl,
  studioMapsEmbedUrl,
  studioNeshanUrl,
} from '../studioLocation'

export function AboutPage() {
  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-14 pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="max-w-3xl flex flex-col gap-5">
            <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
              درباره روتینو
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
              استودیو تولید محتوا در گوهردشت کرج
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              روتینو برای ضبط دوره‌های آموزشی آنلاین، پادکست حرفه‌ای و محتوای شبکه‌های اجتماعی طراحی شده
              است. دوربین‌های سینمایی سونی، میکروفن‌های RØDE و نور NanLite در پکیج‌های دوربین بدون هزینه
              جداگانه در اختیار شماست.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-[1240px] mx-auto px-gutter-lg flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] flex flex-col gap-3">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">فضا و دکور</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                چند لوکیشن داخلی، امکان تغییر پرده و رنگ صحنه، و آماده‌سازی دکور مطابق سناریوی پروژه.
                نمونه‌ها و گالری فضا در صفحه استودیو قرار دارد.
              </p>
              <Link to="/studio" className="font-headline-sm font-bold text-brand-red inline-flex items-center gap-1">
                مشاهده فضای استودیو
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </Link>
            </div>
            <div className="p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] flex flex-col gap-3">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">ساعات کاری</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                شنبه تا جمعه از ۱۰ صبح تا ۱۰ شب. فاصله تا مترو انقلاب حدود دو دقیقه است.
              </p>
              <Link to="/contact" className="font-headline-sm font-bold text-brand-red inline-flex items-center gap-1">
                اطلاعات تماس
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-11 h-11 rounded-xl bg-brand-red text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">location_on</span>
                </span>
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface">آدرس استودیو</h2>
                  <p className="text-label-badge font-label-badge text-on-surface-variant">
                    برای مسیریابی روی آدرس بزنید
                  </p>
                </div>
              </div>
              <a
                href={studioMapsDirUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 px-4 py-3.5 hover:border-brand-red/50 hover:bg-brand-red/5 transition-colors"
                aria-label={`مسیریابی تا ${studioAddress}`}
              >
                <span className="material-symbols-outlined text-brand-red text-[22px] shrink-0 mt-0.5">
                  directions
                </span>
                <span className="font-body-lg text-body-lg text-on-surface leading-relaxed group-hover:text-brand-red transition-colors">
                  {studioAddress}
                </span>
              </a>
              <div className="flex flex-wrap gap-3">
                <a
                  href={studioMapsDirUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold shadow-lg shadow-brand-red/20 hover:opacity-95"
                >
                  <span className="material-symbols-outlined text-[20px]">navigation</span>
                  مسیریابی با گوگل‌مپ
                </a>
                <a
                  href={studioNeshanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm font-semibold border border-outline-variant/40 hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px]">explore</span>
                  مسیریابی با نشان
                </a>
              </div>
            </div>
            <iframe
              title="نقشه استودیو روتینو"
              src={studioMapsEmbedUrl}
              className="w-full h-[280px] md:h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  )
}
