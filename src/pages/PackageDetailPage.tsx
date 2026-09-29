import { Link, useParams } from 'react-router-dom'
import { getOfferPackage, packagesPath } from '../packages/offerPackages'
import { BusinessSupportPage } from './BusinessSupportPage'
import { NotFoundPage } from './NotFoundPage'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2'

const btnPrimary = `inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold shadow-lg shadow-brand-red/30 hover:opacity-95 transition-opacity ${focusRing}`

const btnSecondary = `inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm font-semibold border border-outline-variant/40 hover:bg-surface-container transition-colors ${focusRing}`

export function PackageDetailPage() {
  const { slug } = useParams()
  const pkg = getOfferPackage(slug)

  if (!pkg) return <NotFoundPage />

  if (pkg.slug === 'business-support') return <BusinessSupportPage />

  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-12 pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg flex flex-col gap-5 max-w-3xl">
          <Link to={packagesPath} className="self-start text-[13px] font-bold text-brand-red">
            بازگشت به پکیج‌ها
          </Link>
          <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
            پکیج روتینو
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
            {pkg.title}
          </h1>
        </div>
      </section>
      <section className="pb-20">
        <div className="max-w-[1240px] mx-auto px-gutter-lg max-w-3xl">
          {pkg.body ? (
            <div className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-line">
              {pkg.body}
            </div>
          ) : (
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              جزئیات این پکیج به‌زودی اینجا قرار می‌گیرد.
            </p>
          )}
          <div className="flex flex-wrap gap-3 mt-10">
            <Link to={packagesPath} className={btnSecondary}>
              همه پکیج‌ها
            </Link>
            <Link to="/contact" className={btnPrimary}>
              تماس با روتینو
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
