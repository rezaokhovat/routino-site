import { Link } from 'react-router-dom'
import { offerPackages, packageDetailPath } from '../packages/offerPackages'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2'

export function PackagesPage() {
  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-12 pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg flex flex-col gap-5">
          <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
            پکیج‌های روتینو
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
            پکیج‌ها
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            طرح حمایت از کسب‌وکارها را باز کنید، مشخصات را بفرستید تا با شما تماس بگیریم.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          {offerPackages.map((item) => (
            <Link
              key={item.slug}
              to={packageDetailPath(item.slug)}
              className={`group rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] overflow-hidden flex flex-col md:flex-row md:items-center hover:border-brand-red/40 transition-colors ${focusRing}`}
            >
              <span className="relative hidden md:block w-[200px] shrink-0 aspect-[9/16] overflow-hidden">
                <img
                  src={item.image ?? '/images/studio-location-01.jpg'}
                  alt={item.imageAlt ?? item.title}
                  width={1080}
                  height={1920}
                  className="h-full w-full object-cover object-[84%_center] transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="p-6 md:p-10 flex flex-col gap-4 justify-center">
                <h2 className="font-headline-md text-[22px] md:text-headline-md font-bold text-on-surface">
                  {item.title}
                </h2>
                {item.teaser ? (
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-xl">
                    {item.teaser}
                  </p>
                ) : null}
                <span className="mt-1 font-headline-sm text-[15px] font-bold text-brand-red inline-flex items-center gap-1">
                  مشاهده پکیج
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
                    chevron_left
                  </span>
                </span>
              </span>
            </Link>
          ))}
          <Link
            to="/studio#calculator"
            className="mt-8 inline-flex items-center gap-2 text-brand-red font-headline-sm font-bold"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              calculate
            </span>
            بازگشت به ماشین‌حساب استودیو
          </Link>
        </div>
      </section>
    </main>
  )
}
