import {
  studioAddress,
  studioMapsDirUrl,
  studioMapsEmbedUrl,
  studioNeshanUrl,
} from '../studioLocation'

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
        <div className="max-w-[1240px] mx-auto px-gutter-lg grid grid-cols-1 md:grid-cols-3 gap-5">
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
