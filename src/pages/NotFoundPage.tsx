import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="w-full pt-28 bg-surface">
      <section className="max-w-[1240px] mx-auto px-gutter-lg py-20 md:py-28">
        <p className="font-label-badge text-label-badge font-bold text-brand-red mb-4">خطای ۴۰۴</p>
        <h1 className="font-headline-lg text-[28px] md:text-[36px] font-extrabold text-on-surface mb-4">
          این صفحه در سایت روتینو نیست.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">
          مسیر واردشده حذف شده یا وجود ندارد. از لینک‌های زیر به بخش‌های اصلی روتینو برگردید.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold"
          >
            صفحه اصلی
          </Link>
          <Link
            to="/studio"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm font-semibold border border-outline-variant/40"
          >
            استودیو
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm font-semibold border border-outline-variant/40"
          >
            تماس با ما
          </Link>
        </div>
      </section>
    </main>
  )
}
