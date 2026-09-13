import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { roadmapSteps, type RoadmapStatus, type RoadmapStep } from './roadmapData'

function statusBadgeClass(status: RoadmapStatus) {
  if (status === 'now') {
    return 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30'
  }
  if (status === 'building') {
    return 'bg-brand-orange/15 text-brand-orange border-brand-orange/40'
  }
  return 'bg-on-surface/5 text-on-surface-variant border-outline-variant/40'
}

function statusFa(status: RoadmapStatus) {
  if (status === 'now') return 'فعال'
  if (status === 'building') return 'در حال ساخت'
  return 'در مسیر آینده'
}

function StepCard({ step }: { step: RoadmapStep }) {
  const isFuture = step.status === 'future'
  const isBuilding = step.status === 'building'

  return (
    <article
      className={`roadmap-step relative rounded-3xl border p-6 md:p-8 transition-all duration-700 ease-out ${
        isBuilding
          ? 'bg-brand-charcoal text-on-primary border-brand-orange/40 shadow-2xl shadow-brand-red/20 md:scale-[1.02]'
          : isFuture
            ? 'bg-surface-container-lowest/70 border-outline-variant/25 text-on-surface'
            : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface shadow-sm'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2.5 mb-5">
        <span
          className={`font-stat-counter text-[28px] md:text-[34px] font-extrabold tracking-tight ${
            isBuilding ? 'text-brand-orange' : isFuture ? 'text-on-surface-variant/50' : 'text-brand-red'
          }`}
        >
          {step.number}
        </span>
        <span
          className={`px-2.5 py-1 rounded-full border text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase ${statusBadgeClass(step.status)} ${
            isBuilding ? 'bg-brand-orange/20 text-brand-orange border-brand-orange/50' : ''
          }`}
        >
          {step.statusLabel}
        </span>
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
            isBuilding
              ? 'bg-white/10 text-secondary-fixed'
              : isFuture
                ? 'bg-surface-container text-on-surface-variant'
                : 'bg-brand-red/10 text-brand-red'
          }`}
        >
          {statusFa(step.status)}
        </span>
        {step.accent && (
          <span
            className={`ms-auto text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase ${
              isBuilding ? 'text-brand-orange/90' : 'text-on-surface-variant/70'
            }`}
            dir="ltr"
          >
            {step.accent}
          </span>
        )}
      </div>

      <h3
        className={`font-headline-lg text-[24px] md:text-[30px] font-extrabold tracking-tight mb-2 ${
          isBuilding ? 'text-on-primary' : 'text-on-surface'
        }`}
        dir="ltr"
      >
        {step.title}
      </h3>

      {step.heading && (
        <p
          className={`font-headline-md text-[18px] md:text-[22px] font-bold mb-4 ${
            isBuilding ? 'text-brand-orange' : 'text-brand-red'
          }`}
        >
          {step.heading}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {step.description.map((line) => (
          <p
            key={line}
            className={`font-body-md text-body-md leading-relaxed ${
              isBuilding ? 'text-secondary-fixed' : isFuture ? 'text-on-surface-variant/90' : 'text-on-surface-variant'
            }`}
          >
            {line}
          </p>
        ))}
      </div>

      {step.micro && (
        <p
          className={`mt-5 text-[13px] md:text-[14px] font-bold tracking-wide ${
            isBuilding ? 'text-on-primary' : 'text-on-surface'
          }`}
        >
          {step.micro}
          <span className={`block mt-1 text-[11px] font-semibold tracking-[0.12em] uppercase ${isBuilding ? 'text-brand-orange' : 'text-brand-red'}`} dir="ltr">
            From content to action.
          </span>
        </p>
      )}

      {step.items && step.items.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {step.items.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-[12px] font-bold text-on-surface"
              dir="ltr"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {step.cta && (
        <Link
          to={step.cta.to}
          className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm text-[14px] font-bold shadow-md shadow-brand-red/25 hover:opacity-95 transition-opacity"
        >
          {step.cta.label}
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </Link>
      )}
    </article>
  )
}

export function HomeFutureRoadmap() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const steps = root.querySelectorAll<HTMLElement>('.roadmap-step')

    const reveal = (el: Element) => el.classList.add('is-visible')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      steps.forEach(reveal)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    steps.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={rootRef}
      id="future"
      className="w-full py-20 md:py-28 bg-surface relative overflow-hidden scroll-mt-28"
    >
      <div className="absolute -top-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-brand-red/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-amber/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-gutter-lg">
        <div className="max-w-3xl mb-14 md:mb-20">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-charcoal text-on-primary font-label-badge text-label-badge font-bold tracking-[0.14em] mb-5"
            dir="ltr"
          >
            THE FUTURE OF ROUTINO
          </span>
          <h2 className="font-headline-lg text-[28px] md:text-[40px] leading-tight font-extrabold text-on-surface mb-5">
            روتینو قراره خیلی بیشتر از چیزی باشه که امروز می‌بینید.
          </h2>
          <div className="flex flex-col gap-3 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            <p>ما روتینو رو فقط برای ساختن یک پادکست، یک استودیو یا یک اپلیکیشن شروع نکردیم.</p>
            <p>
              هدف ما ساختن یک اکوسیستم حول سلامت، ورزش و سبک زندگیه؛ اکوسیستمی که محتوا، تکنولوژی،
              تجربه، فضا و محصولات مختلف رو کنار هم قرار می‌ده.
            </p>
            <p className="font-bold text-on-surface pt-2">چیزی که امروز می‌بینید، فقط شروع این مسیره.</p>
          </div>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute top-0 bottom-0 right-[1.15rem] w-px bg-gradient-to-b from-brand-red via-brand-orange/70 to-outline-variant/40"
            aria-hidden
          />
          <div
            className="md:hidden absolute top-0 bottom-0 right-4 w-px bg-gradient-to-b from-brand-red via-brand-orange/50 to-outline-variant/30"
            aria-hidden
          />

          <ol className="flex flex-col gap-8 md:gap-12">
            {roadmapSteps.map((step) => (
              <li key={step.number} className="relative md:pr-14 pr-10">
                <span
                  className={`absolute right-0 md:right-[0.55rem] top-8 w-3.5 h-3.5 rounded-full border-2 z-10 ${
                    step.status === 'now'
                      ? 'bg-brand-red border-brand-red shadow-[0_0_0_4px_rgba(217,31,64,0.15)]'
                      : step.status === 'building'
                        ? 'bg-brand-orange border-brand-orange shadow-[0_0_0_6px_rgba(235,78,17,0.2)] animate-pulse'
                        : 'bg-surface-container-lowest border-outline-variant'
                  }`}
                  aria-hidden
                />
                <StepCard step={step} />
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 md:mt-24 rounded-[2rem] bg-brand-charcoal text-on-primary px-6 py-12 md:px-14 md:py-16 text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-transparent to-brand-orange/10 pointer-events-none" />
          <div className="relative flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <p
              className="text-[13px] md:text-[15px] font-bold tracking-[0.12em] text-brand-orange uppercase"
              dir="ltr"
            >
              Media → Studio → Health App → Cafe → Gym → Wear
            </p>
            <h3 className="font-headline-lg text-[24px] md:text-[34px] font-extrabold leading-snug">
              این فقط یک لیست از کسب‌وکارهای مختلف نیست.
            </h3>
            <p className="font-body-lg text-body-lg text-secondary-fixed leading-relaxed">
              همه این‌ها باید به یک ایده مشترک برگردن: کمک به ساختن یک زندگی بهتر، از طریق روتین‌های
              بهتر.
            </p>
            <div className="pt-4 flex flex-col gap-2">
              <span className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] text-secondary-fixed uppercase" dir="ltr">
                One Brand. One Ecosystem.
              </span>
              <span className="font-stat-counter text-[40px] md:text-[56px] font-extrabold tracking-tight text-on-primary" dir="ltr">
                ROUTINO
              </span>
              <span className="text-[13px] md:text-[14px] font-semibold text-brand-orange" dir="ltr">
                Small routines. Big changes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
