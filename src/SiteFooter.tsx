import { Link } from 'react-router-dom'
import { RoutinoLogo } from './RoutinoLogo'
import { siteNav } from './siteNav'

const packages = [
  'لوکیشن خالی استودیو (ساعتی ۶۵۰ هزار ت)',
  'پکیج ۱ دوربین سینمایی (ساعتی ۱.۶ م.ت)',
  'پکیج ۲ دوربین اختصاصی (ساعتی ۲ م.ت)',
  'پکیج ۳ دوربین VIP (ساعتی ۲.۴ م.ت)',
  'تخفیف پلکانی هر ۲ ساعت ۲.۵ درصد',
]

export function SiteFooter() {
  return (
    <footer className="w-full bg-brand-charcoal text-on-surface-variant pt-section-space pb-12 mt-section-space">
      <div className="max-w-[1240px] mx-auto px-gutter-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter-xl pb-16 border-b border-glass-border-dark">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <RoutinoLogo height={56} className="self-start" />
            <p className="font-body-md text-body-md text-secondary-container leading-relaxed">
              روتینو برند تولید محتواست. بخش استودیوی این مجموعه لوکیشنی مجهز برای فیلم‌برداری، پادکست
              و محتوای شبکه‌های اجتماعی با تجهیزات سونی، RØDE و نورپردازی NanLite فراهم می‌کند.
            </p>
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-lg bg-brand-surface-dark border border-glass-border-dark text-on-tertiary-container font-label-badge text-label-badge">
                دوربین‌های 4K سونی
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-brand-surface-dark border border-glass-border-dark text-on-tertiary-container font-label-badge text-label-badge">
                میکسر RØDECaster II
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-brand-surface-dark border border-glass-border-dark text-on-tertiary-container font-label-badge text-label-badge">
                نورپردازی NanLite FC
              </span>
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-headline-sm text-headline-sm font-bold text-on-primary border-r-4 border-brand-red pr-3">
              پکیج‌های بخش استودیو
            </span>
            <ul className="flex flex-col gap-2.5 font-body-md text-body-md text-secondary-fixed">
              {packages.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-brand-red">chevron_left</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-headline-sm text-headline-sm font-bold text-on-primary border-r-4 border-brand-red pr-3">
              دسترسی سریع
            </span>
            <ul className="flex flex-col gap-2.5 font-body-md text-body-md text-secondary-fixed">
              {siteNav.map((item) => (
                <li key={item.to} className="hover:text-brand-red transition-colors">
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-headline-sm text-headline-sm font-bold text-on-primary border-r-4 border-brand-red pr-3">
              ارتباط با روتینو
            </span>
            <div className="flex flex-col gap-3 text-secondary-fixed font-body-md text-body-md">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-brand-red text-[20px] shrink-0 mt-0.5">
                  location_on
                </span>
                <span>کرج، بلوار انقلاب، فاز سوم گوهردشت، گلستان یکم، پلاک ۶ واحد ۲</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-brand-red text-[20px] shrink-0">call</span>
                <a href="tel:09903760867">شماره رزرو و هماهنگی: ۰۹۹۰۳۷۶۰۸۶۷</a>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-brand-red text-[20px] shrink-0">mail</span>
                <a href="mailto:info@routino.ir">ایمیل: info@routino.ir</a>
              </div>
              <div className="mt-2 p-3 rounded-xl bg-brand-surface-dark border border-glass-border-dark flex items-center justify-between">
                <span className="font-label-badge text-label-badge text-on-tertiary-container">
                  دسترسی سریع به مترو انقلاب (۲ دقیقه)
                </span>
                <span className="material-symbols-outlined text-brand-amber text-[18px]">
                  directions_subway
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-md text-body-md text-secondary-fixed">
          <p>© کلیه حقوق مادی و معنوی متعلق به «روتینو (Routino)» می‌باشد.</p>
        </div>
      </div>
    </footer>
  )
}
