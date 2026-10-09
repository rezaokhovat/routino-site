import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api, ApiError } from '../api/client'
import { useAuth } from '../auth/AuthProvider'
import { JobTitleSearch } from './JobTitleSearch'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2'

const fieldClass =
  'w-full min-h-12 rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body-md text-[16px] leading-6 text-on-surface outline-none focus:border-brand-red/60'

function toEnDigits(value: string) {
  return value.replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
}

function normalizeMobile(value: string) {
  return toEnDigits(value).replace(/[\s-]/g, '')
}

function isValidMobile(value: string) {
  return /^09\d{9}$/.test(normalizeMobile(value))
}

export function BusinessSupportForm() {
  const { user } = useAuth()
  const [jobTitle, setJobTitle] = useState('')
  const [otherJob, setOtherJob] = useState('')
  const [mobile, setMobile] = useState('')
  const [instagram, setInstagram] = useState('')
  const [otherSocials, setOtherSocials] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (user?.mobile && !mobile) setMobile(user.mobile)
  }, [user, mobile])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const job = jobTitle === 'سایر' ? otherJob.trim() : jobTitle
    if (!job) {
      setError('عنوان شغلی را انتخاب کنید.')
      return
    }
    if (!isValidMobile(mobile)) {
      setError('شماره همراه را با فرمت ۰۹۱۲۱۲۳۴۵۶۷ وارد کنید.')
      return
    }
    if (!instagram.trim()) {
      setError('آدرس اینستاگرام را وارد کنید.')
      return
    }

    setBusy(true)
    try {
      await api('/api/business-support', {
        method: 'POST',
        body: JSON.stringify({
          jobTitle: job,
          mobile: normalizeMobile(mobile),
          instagram: instagram.trim(),
          otherSocials: otherSocials.trim() || null,
        }),
      })
      setSent(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'ثبت درخواست ناموفق بود. دوباره تلاش کنید.')
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl sm:rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] p-5 sm:p-8 flex flex-col gap-3">
        <h3 className="font-headline-md text-[20px] font-bold text-on-surface">درخواست ثبت شد</h3>
        <p className="font-body-md text-[15px] leading-7 sm:text-body-md text-on-surface-variant">
          مشخصات شما ذخیره شد. تیم روتینو برای هماهنگی ضبط با همین شماره تماس می‌گیرد.
        </p>
        {user ? (
          <Link
            to="/profile"
            className={`mt-2 inline-flex items-center justify-center min-h-12 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold ${focusRing}`}
          >
            دیدن درخواست‌ها در پروفایل
          </Link>
        ) : null}
      </div>
    )
  }

  return (
    <form
      id="request"
      onSubmit={onSubmit}
      className="rounded-2xl sm:rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] p-5 sm:p-8 flex flex-col gap-5 scroll-mt-28"
    >
      <div>
        <h2 className="font-headline-md text-[20px] sm:text-[22px] font-bold text-on-surface">
          مشخصات را ثبت کنید تا تماس بگیریم
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
          {user
            ? 'درخواست به حساب شما اضافه می‌شود و برای هماهنگی ضبط با شما تماس می‌گیریم.'
            : 'عنوان شغلی، شماره همراه و آدرس صفحه‌های مجازی‌تان را وارد کنید. نیازی به واتساپ یا تماس از طرف شما نیست.'}
        </p>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-headline-sm text-[14px] font-bold text-on-surface">عنوان شغلی</span>
        <JobTitleSearch value={jobTitle} onChange={setJobTitle} />
      </label>

      {jobTitle === 'سایر' ? (
        <label className="flex flex-col gap-2">
          <span className="font-headline-sm text-[14px] font-bold text-on-surface">شرح عنوان شغلی</span>
          <input
            name="otherJob"
            className={fieldClass}
            value={otherJob}
            onChange={(event) => setOtherJob(event.target.value)}
            required
          />
        </label>
      ) : null}

      <label className="flex flex-col gap-2">
        <span className="font-headline-sm text-[14px] font-bold text-on-surface">شماره همراه</span>
        <input
          name="mobile"
          className={`${fieldClass} tracking-wide`}
          dir="ltr"
          inputMode="tel"
          autoComplete="tel"
          placeholder="09121234567"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-headline-sm text-[14px] font-bold text-on-surface">اینستاگرام</span>
        <input
          name="instagram"
          className={fieldClass}
          dir="ltr"
          placeholder="@username یا لینک صفحه"
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-headline-sm text-[14px] font-bold text-on-surface">
          صفحه‌های مجازی دیگر <span className="font-normal text-on-surface-variant">(اختیاری)</span>
        </span>
        <textarea
          name="otherSocials"
          className={`${fieldClass} min-h-24 resize-y`}
          placeholder="تلگرام، سایت یا لینک‌های دیگر"
          value={otherSocials}
          onChange={(event) => setOtherSocials(event.target.value)}
        />
      </label>

      {error ? <p className="text-[14px] font-bold text-brand-red">{error}</p> : null}

      <button
        type="submit"
        disabled={busy}
        className={`w-full sm:w-auto sm:self-start inline-flex items-center justify-center min-h-12 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold shadow-lg shadow-brand-red/30 hover:opacity-95 disabled:opacity-60 ${focusRing}`}
      >
        {busy ? 'در حال ثبت…' : 'ثبت درخواست'}
      </button>
    </form>
  )
}
