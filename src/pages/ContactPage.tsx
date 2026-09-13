import { studioAddress, studioNeshanUrl } from '../studioLocation'

export function ContactPage() {
  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-14 pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg max-w-3xl flex flex-col gap-5">
          <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
            ارتباط با برند روتینو
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
            تماس با روتینو
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            برای هماهنگی با تیم روتینو — از جمله رزرو بخش استودیو، بازدید حضوری یا مشاوره تجهیزات —
            با ما در تماس باشید.
          </p>
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-[1240px] mx-auto px-gutter-lg grid grid-cols-1 md:grid-cols-2 gap-5">
          <a
            href="tel:09903760867"
            className="p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] flex items-start gap-4 hover:border-brand-red/40 transition-colors"
          >
            <span className="w-12 h-12 rounded-2xl bg-brand-red text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">call</span>
            </span>
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">تلفن رزرو</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">۰۹۹۰۳۷۶۰۸۶۷</p>
            </div>
          </a>
          <a
            href="mailto:info@routino.ir"
            className="p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] flex items-start gap-4 hover:border-brand-red/40 transition-colors"
          >
            <span className="w-12 h-12 rounded-2xl bg-brand-red text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">mail</span>
            </span>
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">ایمیل</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">info@routino.ir</p>
            </div>
          </a>
          <div className="p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] flex items-start gap-4">
            <span className="w-12 h-12 rounded-2xl bg-brand-red text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">location_on</span>
            </span>
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">آدرس</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                {studioAddress}
              </p>
            </div>
          </div>
          <div className="p-6 rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] flex items-start gap-4">
            <span className="w-12 h-12 rounded-2xl bg-brand-red text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </span>
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">ساعات کاری</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                شنبه تا جمعه، ۱۰ صبح تا ۱۰ شب
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[1240px] mx-auto px-gutter-lg mt-8">
          <a
            href={studioNeshanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] p-6 md:p-8 hover:border-brand-red/40 hover:shadow-lg transition-all"
            aria-label="مسیریابی تا استودیو روتینو با اپلیکیشن نشان"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange text-on-primary flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/25">
                <span className="material-symbols-outlined text-[30px]">near_me</span>
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  مسیریابی با نشان
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  با یک کلیک، لوکیشن استودیو روتینو در اپلیکیشن نشان باز می‌شود تا مسیر را تا رسیدن به
                  ما دنبال کنید.
                </p>
                <p className="text-label-badge font-label-badge text-on-surface-variant/80 mt-2 truncate">
                  {studioAddress}
                </p>
              </div>
              <span className="inline-flex items-center justify-center gap-2 self-start sm:self-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm text-[15px] font-bold shadow-md shadow-brand-red/30 group-hover:opacity-95 transition-opacity">
                <span className="material-symbols-outlined text-[20px]">explore</span>
                باز کردن نشان
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </span>
            </div>
          </a>
        </div>

        <div className="max-w-[1240px] mx-auto px-gutter-lg mt-6">
          <a
            href="tel:09903760867"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold shadow-lg shadow-brand-red/40 hover:opacity-95"
          >
            <span className="material-symbols-outlined text-[22px]">call</span>
            تماس مستقیم: ۰۹۹۰۳۷۶۰۸۶۷
          </a>
        </div>
      </section>
    </main>
  )
}
