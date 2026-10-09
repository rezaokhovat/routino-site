import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { api, ApiError, type AuthResponse } from '../api/client'
import { useAuth } from '../auth/AuthProvider'

const fieldClass =
  'w-full min-h-12 rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body-md text-[16px] leading-6 text-on-surface outline-none focus:border-brand-red/60'

function safeNext(raw: string | null) {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/profile'
  return raw
}

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))

  const [step, setStep] = useState<'mobile' | 'code'>('mobile')
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (user) navigate(next, { replace: true })
  }, [user, next, navigate])

  async function requestCode(event: FormEvent) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await api('/api/auth/otp/request', {
        method: 'POST',
        body: JSON.stringify({ mobile }),
      })
      setStep('code')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'ارسال کد ناموفق بود.')
    } finally {
      setBusy(false)
    }
  }

  async function verifyCode(event: FormEvent) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      const result = await api<AuthResponse>('/api/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ mobile, code }),
      })
      login(result.token, result.user)
      navigate(next, { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'ورود ناموفق بود.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="w-full pt-28 bg-surface">
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-14 pt-10">
        <div className="max-w-[1240px] mx-auto px-gutter-lg max-w-xl flex flex-col gap-5">
          <span className="self-start px-3.5 py-1.5 rounded-full bg-surface-container text-brand-red font-label-badge text-label-badge">
            ورود با شماره همراه
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold text-on-surface">
            ورود به روتینو
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            کد یک‌بارمصرف به شماره همراه شما پیامک می‌شود. پس از ورود می‌توانید رزرو استودیو را از تقویم
            ثبت کنید.
          </p>
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-[1240px] mx-auto px-gutter-lg max-w-xl">
          <div className="rounded-3xl border border-outline-variant/40 bg-[#fcfaf7] p-6 sm:p-8">
            {step === 'mobile' ? (
              <form className="flex flex-col gap-4" onSubmit={requestCode}>
                <label className="flex flex-col gap-2">
                  <span className="font-headline-sm text-[14px] font-bold text-on-surface">شماره همراه</span>
                  <input
                    className={fieldClass}
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    required
                  />
                </label>
                {error ? <p className="text-sm text-brand-red">{error}</p> : null}
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold disabled:opacity-60"
                >
                  {busy ? 'در حال ارسال…' : 'دریافت کد'}
                </button>
              </form>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={verifyCode}>
                <p className="text-sm text-on-surface-variant">
                  کد ۶ رقمی به <span className="font-bold text-on-surface ltr inline-block">{mobile}</span>{' '}
                  ارسال شد. دو دقیقه اعتبار دارد.
                </p>
                <label className="flex flex-col gap-2">
                  <span className="font-headline-sm text-[14px] font-bold text-on-surface">کد تأیید</span>
                  <input
                    className={fieldClass}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="۱۲۳۴۵۶"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    required
                  />
                </label>
                {error ? <p className="text-sm text-brand-red">{error}</p> : null}
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold disabled:opacity-60"
                >
                  {busy ? 'در حال بررسی…' : 'ورود'}
                </button>
                <button
                  type="button"
                  className="text-sm font-bold text-brand-red"
                  onClick={() => {
                    setStep('mobile')
                    setCode('')
                    setError('')
                  }}
                >
                  تغییر شماره
                </button>
              </form>
            )}
            <p className="mt-6 text-sm text-on-surface-variant">
              نیاز به هماهنگی تلفنی دارید؟{' '}
              <Link className="font-bold text-brand-red" to="/contact">
                تماس با روتینو
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
