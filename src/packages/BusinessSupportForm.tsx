import { useState, type FormEvent } from 'react'
import { SITE } from '../seo/config.ts'
import { jobTitles } from './offerPackages'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2'

const fieldClass =
  'w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface outline-none focus:border-brand-red/60'

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
  const [jobTitle, setJobTitle] = useState('')
  const [otherJob, setOtherJob] = useState('')
  const [mobile, setMobile] = useState('')
  const [instagram, setInstagram] = useState('')
  const [otherSocials, setOtherSocials] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [message, setMessage] = useState('')

  const waHref = `https://wa.me/${SITE.phone.replace(/^\+/, '')}?text=${encodeURIComponent(message)}`
  const mailHref = `mailto:${SITE.email}?subject=${encodeURIComponent('درخواست طرح حمایت از کسب و کارها')}&body=${encodeURIComponent(message)}`

  function onSubmit(event: FormEvent<HTMLFormElement>) {
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

    const lines = [
      'درخواست طرح حمایت از کسب و کارها',
      '',
      `عنوان شغلی: ${job}`,
      `شماره همراه: ${normalizeMobile(mobile)}`,
      `اینستاگرام: ${instagram.trim()}`,
    ]
    if (otherSocials.trim()) {
      lines.push(`صفحه‌های دیگر: ${otherSocials.trim()}`)
    }

    const text = lines.join('\n')
    setMessage(text)
    setSent(true)
    window.open(`https://wa.me/${SITE.phone.replace(/^\+/, '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  if (sent) {
    return (
      <div className="rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] p-6 md:p-8 flex flex-col gap-3">
        <h3 className="font-headline-md text-[20px] font-bold text-on-surface">درخواست آماده ارسال شد</h3>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          اگر واتساپ باز شد، پیام را بفرستید. در غیر این صورت از ایمیل یا تماس استفاده کنید تا مشخصات را
          ثبت کنیم.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold ${focusRing}`}
          >
            ارسال در واتساپ
          </a>
          <a
            href={mailHref}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm font-semibold border border-outline-variant/40 ${focusRing}`}
          >
            ارسال ایمیل
          </a>
          <a
            href={`tel:${SITE.phone}`}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm font-semibold border border-outline-variant/40 ${focusRing}`}
          >
            تماس {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    )
  }

  return (
    <form
      id="request"
      onSubmit={onSubmit}
      className="rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] p-6 md:p-8 flex flex-col gap-5 scroll-mt-28"
    >
      <div>
        <h2 className="font-headline-md text-[22px] font-bold text-on-surface">مشخصات را بفرستید تا تماس بگیریم</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
          عنوان شغلی، شماره همراه و آدرس صفحه‌های مجازی‌تان را وارد کنید.
        </p>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-headline-sm text-[14px] font-bold text-on-surface">عنوان شغلی</span>
        <select
          name="jobTitle"
          className={fieldClass}
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
          required
        >
          <option value="">انتخاب کنید</option>
          {jobTitles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
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
        className={`self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold shadow-lg shadow-brand-red/30 hover:opacity-95 ${focusRing}`}
      >
        ثبت درخواست تماس
      </button>
    </form>
  )
}
