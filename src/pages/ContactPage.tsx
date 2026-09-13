export function ContactPage() {
  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-14 pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg max-w-3xl flex flex-col gap-5">
          <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
            هماهنگی آفیش
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
            تماس با استودیو روتینو
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            برای رزرو تاریخ، بازدید حضوری یا مشاوره تجهیزات با کارشناسان روتینو تماس بگیرید.
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
                کرج، بلوار انقلاب، فاز سوم گوهردشت، گلستان یکم، پلاک ۶ واحد ۲
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
