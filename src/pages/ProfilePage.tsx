import { useEffect, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { api, ApiError, type ApiUser, type BusinessSupportLead, type Reservation } from '../api/client'
import { useAuth } from '../auth/AuthProvider'
import { formatRange } from '../StudioAvailability.data'

type ProfileTab = 'account' | 'upcoming' | 'history' | 'support'

const tabs: Array<{ id: ProfileTab; label: string; icon: string; hint: string }> = [
  { id: 'account', label: 'حساب من', icon: 'person', hint: 'شماره و دسترسی‌ها' },
  { id: 'upcoming', label: 'رزروهای پیش رو', icon: 'event_available', hint: 'آفیش‌های قطعی' },
  { id: 'history', label: 'تاریخچه رزرو', icon: 'history', hint: 'جلسات گذشته' },
  { id: 'support', label: 'طرح حمایت', icon: 'volunteer_activism', hint: 'درخواست‌های ثبت‌شده' },
]

function isProfileTab(value: string | null): value is ProfileTab {
  return tabs.some((tab) => tab.id === value)
}

function toFaDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)] ?? digit)
}

function statusMeta(status: Reservation['status']) {
  if (status === 'confirmed') {
    return { label: 'قطعی', className: 'bg-emerald-600 text-white', icon: 'check_circle' }
  }
  if (status === 'cancelled') {
    return { label: 'لغو شده', className: 'bg-on-surface-variant/20 text-on-surface-variant', icon: 'cancel' }
  }
  return { label: 'انجام‌شده', className: 'bg-brand-red text-on-primary', icon: 'task_alt' }
}

function EmptyState({
  icon,
  title,
  text,
  actionTo,
  actionLabel,
}: {
  icon: string
  title: string
  text: string
  actionTo?: string
  actionLabel?: string
}) {
  return (
    <div className="rounded-2xl border border-dashed border-outline-variant/50 bg-surface-container-lowest px-6 py-12 flex flex-col items-center text-center gap-3">
      <span className="w-14 h-14 rounded-2xl bg-surface-container text-brand-red flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </span>
      <h3 className="font-headline-sm text-[18px] font-bold text-on-surface">{title}</h3>
      <p className="font-body-md text-[14px] leading-7 text-on-surface-variant max-w-sm">{text}</p>
      {actionTo && actionLabel ? (
        <Link
          to={actionTo}
          className="mt-2 inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm text-[14px] font-bold"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}

function ReservationCard({
  item,
  onCancel,
  cancelling,
}: {
  item: Reservation
  onCancel?: (id: string) => void
  cancelling?: boolean
}) {
  const status = statusMeta(item.status)
  const hours = item.endHour - item.startHour

  return (
    <article className="rounded-2xl sm:rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <span className="w-11 h-11 rounded-xl bg-brand-red text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
          </span>
          <div className="min-w-0">
            <h3 className="font-headline-sm text-[16px] sm:text-[18px] font-bold text-on-surface">
              {item.weekday}
            </h3>
            <p className="text-[13px] text-on-surface-variant mt-0.5">{item.dateLabel}</p>
          </div>
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${status.className}`}>
          <span className="material-symbols-outlined text-[14px]">{status.icon}</span>
          {status.label}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-surface border border-outline-variant/30 px-3.5 py-3">
          <p className="text-[11px] font-bold text-on-surface-variant mb-1">ساعت</p>
          <p className="font-headline-sm text-[14px] font-bold text-on-surface">{formatRange(item.startHour, item.endHour)}</p>
        </div>
        <div className="rounded-2xl bg-surface border border-outline-variant/30 px-3.5 py-3">
          <p className="text-[11px] font-bold text-on-surface-variant mb-1">مدت</p>
          <p className="font-headline-sm text-[14px] font-bold text-on-surface">{toFaDigits(hours)} ساعت</p>
        </div>
      </div>
      {onCancel ? (
        <button
          type="button"
          disabled={cancelling}
          onClick={() => onCancel(item.id)}
          className="self-start inline-flex items-center gap-1.5 min-h-10 px-4 rounded-xl border border-brand-red/30 text-brand-red font-headline-sm text-[13px] font-bold hover:bg-brand-red/5 disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[18px]">event_busy</span>
          {cancelling ? 'در حال لغو…' : 'لغو این رزرو'}
        </button>
      ) : null}
    </article>
  )
}

function LeadCard({ item }: { item: BusinessSupportLead }) {
  const rows = [
    { icon: 'call', label: 'شماره همراه', value: toFaDigits(item.mobile), ltr: false },
    { icon: 'photo_camera', label: 'اینستاگرام', value: item.instagram, ltr: true },
  ]
  if (item.otherSocials) {
    rows.push({ icon: 'share', label: 'صفحه‌های دیگر', value: item.otherSocials, ltr: false })
  }

  return (
    <article className="rounded-2xl sm:rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-red to-brand-orange text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
          </span>
          <div className="min-w-0">
            <h3 className="font-headline-sm text-[16px] sm:text-[18px] font-bold text-on-surface">{item.jobTitle}</h3>
            <p className="text-[13px] text-on-surface-variant mt-0.5">ثبت در {item.dateLabel}</p>
          </div>
        </div>
        <span className="shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white">ثبت‌شده</span>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl bg-surface border border-outline-variant/30 px-3.5 py-3 flex items-start gap-2.5"
          >
            <span className="material-symbols-outlined text-[18px] text-brand-red mt-0.5">{row.icon}</span>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold text-on-surface-variant">{row.label}</dt>
              <dd
                dir={row.ltr ? 'ltr' : 'rtl'}
                className={`text-[14px] font-bold text-on-surface mt-0.5 break-words ${row.ltr ? 'text-left' : ''}`}
              >
                {row.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </article>
  )
}

function AccountPanel({ user, logout }: { user: ApiUser; logout: () => void }) {
  const joined = new Date(user.createdAt).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col gap-5">
      <article className="rounded-2xl sm:rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
        <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange text-on-primary flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/25">
          <span className="material-symbols-outlined text-[32px]">person</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-bold text-brand-red mb-1">ورود با شماره همراه</p>
          <p dir="ltr" className="font-headline-lg text-[26px] sm:text-[30px] font-extrabold text-on-surface tracking-wide sm:text-left">
            {toFaDigits(user.mobile)}
          </p>
          <p className="text-[13px] text-on-surface-variant mt-1">عضو از {joined}</p>
        </div>
      </article>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          to="/studio#schedule"
          className="rounded-2xl sm:rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-lowest p-5 flex items-start gap-3 hover:border-brand-red/40 transition-colors"
        >
          <span className="w-11 h-11 rounded-xl bg-brand-red text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">event_available</span>
          </span>
          <div>
            <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">رزرو استودیو</h3>
            <p className="text-[13px] text-on-surface-variant mt-1 leading-6">از تقویم هفته یک بازه خالی انتخاب کنید.</p>
          </div>
        </Link>
        <Link
          to="/studio/packages/business-support"
          className="rounded-2xl sm:rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-lowest p-5 flex items-start gap-3 hover:border-brand-red/40 transition-colors"
        >
          <span className="w-11 h-11 rounded-xl bg-brand-orange text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
          </span>
          <div>
            <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">طرح حمایت</h3>
            <p className="text-[13px] text-on-surface-variant mt-1 leading-6">مشخصات را ثبت کنید تا برای ضبط تماس بگیریم.</p>
          </div>
        </Link>
      </div>
      <button
        type="button"
        onClick={logout}
        className="self-start inline-flex items-center gap-2 min-h-11 px-5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest font-headline-sm text-[14px] font-bold text-on-surface hover:border-brand-red/40"
      >
        <span className="material-symbols-outlined text-[18px]">logout</span>
        خروج از حساب
      </button>
    </div>
  )
}

export function ProfilePage() {
  const { user, loading, logout } = useAuth()
  const [params, setParams] = useSearchParams()
  const tab = isProfileTab(params.get('tab')) ? params.get('tab')! : 'account'
  const [upcoming, setUpcoming] = useState<Reservation[]>([])
  const [history, setHistory] = useState<Reservation[]>([])
  const [leads, setLeads] = useState<BusinessSupportLead[]>([])
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    Promise.all([
      api<Reservation[]>('/api/reservations?scope=upcoming'),
      api<Reservation[]>('/api/reservations?scope=history'),
      api<BusinessSupportLead[]>('/api/business-support/mine'),
    ])
      .then(([nextUpcoming, nextHistory, nextLeads]) => {
        if (cancelled) return
        setUpcoming(nextUpcoming)
        setHistory(nextHistory)
        setLeads(nextLeads)
        setReady(true)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'بارگذاری پروفایل ناموفق بود.')
          setReady(true)
        }
      })
    return () => {
      cancelled = true
    }
  }, [user])

  function setTab(next: ProfileTab) {
    setParams(next === 'account' ? {} : { tab: next }, { replace: true })
  }

  async function cancelReservation(id: string) {
    if (!window.confirm('این رزرو لغو شود؟')) return
    setCancellingId(id)
    setError('')
    try {
      await api(`/api/reservations/${id}/cancel`, { method: 'POST' })
      const [nextUpcoming, nextHistory] = await Promise.all([
        api<Reservation[]>('/api/reservations?scope=upcoming'),
        api<Reservation[]>('/api/reservations?scope=history'),
      ])
      setUpcoming(nextUpcoming)
      setHistory(nextHistory)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'لغو رزرو ناموفق بود.')
    } finally {
      setCancellingId(null)
    }
  }

  if (loading) {
    return (
      <main className="w-full pt-28 bg-surface">
        <section className="max-w-[1240px] mx-auto px-gutter-lg py-20">
          <p className="text-on-surface-variant">در حال بارگذاری پروفایل…</p>
        </section>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login?next=/profile" replace />
  }

  const counts: Record<ProfileTab, number | null> = {
    account: null,
    upcoming: upcoming.length,
    history: history.length,
    support: leads.length,
  }
  const active = tabs.find((item) => item.id === tab) ?? tabs[0]

  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-8 pt-8 sm:pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg flex flex-col gap-3">
          <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
            حساب کاربری
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
            پروفایل روتینو
          </h1>
          <p className="font-body-lg text-[15px] sm:text-body-lg text-on-surface-variant max-w-2xl">
            رزرو استودیو، تاریخچه جلسات و درخواست‌های طرح حمایت از همین‌جا قابل مشاهده است.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="max-w-[1240px] mx-auto px-gutter-lg grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          <nav
            aria-label="منوی پروفایل"
            className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-32"
          >
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {tabs.map((item) => {
                const selected = item.id === tab
                const count = counts[item.id]
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    aria-current={selected ? 'page' : undefined}
                    className={`w-full text-right rounded-2xl border px-3.5 py-3.5 sm:px-4 transition-colors ${
                      selected
                        ? 'border-brand-red bg-brand-red/8 shadow-[0_8px_24px_rgba(217,31,64,0.08)]'
                        : 'border-outline-variant/40 bg-[#fcfaf7] hover:border-brand-red/40'
                    }`}
                  >
                    <span className="flex flex-col items-start gap-2.5 lg:flex-row lg:items-center lg:gap-3">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          selected ? 'bg-brand-red text-on-primary' : 'bg-surface-container text-brand-red'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </span>
                      <span className="min-w-0 w-full">
                        <span className="flex items-center justify-between gap-2 min-w-0">
                          <span className="min-w-0 font-headline-sm text-[13px] sm:text-[15px] font-bold text-on-surface leading-6">
                            {item.label}
                          </span>
                          {count ? (
                            <span className="shrink-0 min-w-5 h-5 px-1 rounded-full bg-on-surface text-on-primary text-[10px] font-bold leading-5 text-center">
                              {toFaDigits(count)}
                            </span>
                          ) : null}
                        </span>
                        <span className="hidden lg:block text-[12px] text-on-surface-variant mt-0.5">
                          {item.hint}
                        </span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>

          <div className="lg:col-span-8 xl:col-span-9 min-w-0">
            <div className="rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] p-5 sm:p-7 min-h-[280px]">
            <div className="mb-5">
              <h2 className="font-headline-md text-[22px] sm:text-[24px] font-bold text-on-surface">{active.label}</h2>
              <p className="text-[13px] sm:text-[14px] text-on-surface-variant mt-1">{active.hint}</p>
            </div>
            {error ? <p className="mb-4 text-sm font-bold text-brand-red">{error}</p> : null}
            {!ready ? (
              <p className="text-on-surface-variant">در حال آماده‌سازی این بخش…</p>
            ) : tab === 'account' ? (
              <AccountPanel user={user} logout={logout} />
            ) : tab === 'upcoming' ? (
              upcoming.length === 0 ? (
                <EmptyState
                  icon="event_available"
                  title="رزرو آینده‌ای ندارید"
                  text="از تقویم استودیو یک بازه خالی انتخاب کنید تا آفیش برای شما قفل شود."
                  actionTo="/studio#schedule"
                  actionLabel="رفتن به تقویم"
                />
              ) : (
                <div className="flex flex-col gap-4">
                  {upcoming.map((item) => (
                    <ReservationCard
                      key={item.id}
                      item={item}
                      onCancel={cancelReservation}
                      cancelling={cancellingId === item.id}
                    />
                  ))}
                </div>
              )
            ) : tab === 'history' ? (
              history.length === 0 ? (
                <EmptyState
                  icon="history"
                  title="تاریخچه‌ای ثبت نشده"
                  text="بعد از برگزاری یا لغو رزرو، اینجا فهرست جلسات قبلی را می‌بینید."
                />
              ) : (
                <div className="flex flex-col gap-4">
                  {history.map((item) => (
                    <ReservationCard key={item.id} item={item} />
                  ))}
                </div>
              )
            ) : leads.length === 0 ? (
              <EmptyState
                icon="volunteer_activism"
                title="هنوز درخواستی ندارید"
                text="اگر کسب‌وکار دارید، مشخصات را در طرح حمایت ثبت کنید تا برای ضبط تماس بگیریم."
                actionTo="/studio/packages/business-support"
                actionLabel="ثبت درخواست طرح حمایت"
              />
            ) : (
              <div className="flex flex-col gap-4">
                {leads.map((item) => (
                  <LeadCard key={item.id} item={item} />
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
