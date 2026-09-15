import { Link } from 'react-router-dom'
import { AboutImage } from '../about/AboutImage'
import { teamMembers, type TeamSocialLink } from '../about/teamData'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2'

const btnPrimary = `inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-on-primary font-headline-sm font-bold shadow-lg shadow-brand-red/30 hover:opacity-95 transition-opacity ${focusRing}`

const btnSecondary = `inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-headline-sm font-semibold border border-outline-variant/40 hover:bg-surface-container transition-colors ${focusRing}`

const todayCards = [
  {
    eyebrow: 'رسانه محتوایی',
    title: 'پادکست روتینو',
    text: 'گفت‌وگوهایی درباره سلامت، ورزش، ذهن و زندگی روزمره؛ با زبانی ساده و قابل‌پیگیری.',
    to: '/podcast',
    action: 'شنیدن برنامه‌ها',
    image: '/images/home-podcast.jpg',
    imageAlt: 'فضای ضبط پادکست روتینو با میکروفن و صندلی',
    placeholderPath: '/images/about/today-podcast.jpg',
    imageClass: 'object-[left_center]',
  },
  {
    eyebrow: 'رسانه محتوایی',
    title: 'روتینو پلاس',
    text: 'ویدیوها و محتوای تصویری همان مسیر؛ برای دیدن موضوعاتی که در پادکست درباره‌شان حرف می‌زنیم.',
    to: '/podcast',
    action: 'دیدن محتوا',
    image: undefined,
    imageAlt: 'محتوای تصویری روتینو پلاس',
    placeholderPath: '/images/about/today-plus.jpg',
    imageClass: 'object-center',
  },
  {
    eyebrow: 'فضای تولید و رزرو',
    title: 'استودیو روتینو',
    text: 'فضای حرفه‌ای تولید پادکست، ریلز و ویدیو؛ خدمتی جدا از رسانه که می‌توان آن را رزرو کرد.',
    to: '/studio',
    action: 'مشاهده استودیو',
    image: '/images/home-studio.jpg',
    imageAlt: 'ست تصویربرداری استودیو روتینو',
    placeholderPath: '/images/about/today-studio.jpg',
    imageClass: 'object-[left_center]',
  },
]

const values = [
  {
    icon: 'fact_check',
    title: 'دقت قبل از انتشار',
    text: 'محتوا را با توجه به شواهد و محدودیت‌های آن آماده می‌کنیم.',
  },
  {
    icon: 'chat',
    title: 'زبان قابل‌فهم',
    text: 'موضوع پیچیده را طوری توضیح می‌دهیم که بتوان درباره‌اش تصمیم گرفت.',
  },
  {
    icon: 'directions_walk',
    title: 'تغییرهای کوچک و مداوم',
    text: 'دنبال پیشنهادهایی هستیم که به زندگی روزمره راه پیدا کنند.',
  },
]

function socialIcon(label: string) {
  const key = label.trim().toLowerCase()
  if (key.includes('اینستا') || key.includes('instagram')) return 'photo_camera'
  if (key.includes('لینکدین') || key.includes('linkedin')) return 'work'
  return 'link'
}

function TeamSocials({ links }: { links: TeamSocialLink[] }) {
  if (!links.length) return null

  return (
    <ul className="flex flex-wrap gap-2 pt-1">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-[12px] font-bold text-on-surface hover:bg-brand-red hover:text-on-primary transition-colors ${focusRing}`}
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {socialIcon(link.label)}
            </span>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function AboutPage() {
  const members = [...teamMembers].sort((a, b) => a.order - b.order)

  return (
    <main className="w-full pt-28 bg-surface">
      {/* Hero — light, split layout */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 flex flex-col gap-5 home-reveal">
              <span className="self-start px-3.5 py-1.5 rounded-full bg-brand-red/10 text-brand-red font-label-badge text-label-badge font-bold">
                درباره روتینو
              </span>
              <h1 className="font-headline-lg text-[26px] md:text-[34px] lg:text-[38px] font-extrabold text-on-surface leading-snug">
                روتینو را آدم‌هایی می‌سازند که به بهتر زندگی‌کردن باور دارند.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                ما در روتینو سراغ موضوعاتی می‌رویم که به سلامت، ورزش و سبک زندگی واقعی آدم‌ها مربوط‌اند؛
                آن‌ها را بررسی می‌کنیم، ساده توضیح می‌دهیم و تلاش می‌کنیم به انتخاب‌هایی قابل‌اجرا تبدیلشان
                کنیم.
              </p>
              <a href="#team" className={`${btnPrimary} self-start`}>
                آشنایی با تیم
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  south
                </span>
              </a>
            </div>

            <div className="lg:col-span-7 home-reveal home-reveal-delay-2">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <AboutImage
                  src="/images/home-podcast.jpg"
                  alt="پشت‌صحنه ضبط پادکست در فضای روتینو"
                  eager
                  placeholderLabel="عکس پشت‌صحنه پادکست"
                  placeholderPath="/images/about/hero-1.jpg"
                  className="col-span-2 aspect-[16/10] rounded-[1.75rem]"
                  imgClassName="h-full w-full object-cover object-[left_center]"
                />
                <AboutImage
                  src="/images/home-studio.jpg"
                  alt="ست تصویربرداری و دکور استودیو روتینو"
                  placeholderLabel="عکس پشت‌صحنه استودیو"
                  placeholderPath="/images/about/hero-2.jpg"
                  className="aspect-[4/5] md:aspect-[4/3] rounded-[1.5rem]"
                  imgClassName="h-full w-full object-cover object-[left_center]"
                />
                <AboutImage
                  src="/images/about/hero-3.jpg"
                  alt="جایگاه عکس پشت‌صحنه یا تیم روتینو"
                  placeholderLabel="عکس پشت‌صحنه یا تیم"
                  placeholderPath="/images/about/hero-3.jpg"
                  className="aspect-[4/5] md:aspect-[4/3] rounded-[1.5rem]"
                  imgClassName="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Routino */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <h2 className="font-headline-lg text-[26px] md:text-[32px] font-extrabold text-on-surface leading-snug">
                چرا روتینو شکل گرفت؟
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-5 font-body-md text-body-md md:text-[17px] text-on-surface-variant leading-relaxed">
              <p>
                میان دانستن اینکه چه چیزی برای سلامت و زندگی‌مان بهتر است و انجام‌دادن آن در روزهای شلوغ،
                فاصله‌ای هست. خیلی وقت‌ها اطلاعات هست؛ اما به تصمیم و عادت تبدیل نمی‌شود.
              </p>
              <p>
                روتینو از همین فاصله شروع شد. ما می‌خواهیم با محتوای قابل‌اعتماد، گفت‌وگوی صمیمی و پیشنهاد
                روتین‌های کوچک، این مسیر را کمی کوتاه‌تر کنیم — بدون وعده درمان، تضمین نتیجه یا نسخه‌ای برای
                همه.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Routino today */}
      <section className="w-full pb-16 md:pb-24">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="max-w-2xl mb-10">
            <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 font-label-badge text-label-badge font-bold mb-3">
              روتینو امروز
            </span>
            <h2 className="font-headline-lg text-[26px] md:text-[32px] font-extrabold text-on-surface">
              امروز از اینجا کار می‌کنیم
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
              پادکست و روتینو پلاس رسانه‌های محتوایی برند هستند. استودیو، فضای تولید و خدمت قابل‌رزرو آن
              است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {todayCards.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className={`group rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] overflow-hidden flex flex-col hover:border-brand-red/35 transition-colors ${focusRing}`}
              >
                <AboutImage
                  src={item.image}
                  alt={item.imageAlt}
                  placeholderLabel={`عکس ${item.title}`}
                  placeholderPath={item.placeholderPath}
                  className="aspect-[16/10]"
                  imgClassName={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${item.imageClass}`}
                />
                <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
                  <span className="self-start px-2.5 py-1 rounded-full bg-brand-red/10 text-brand-red text-[12px] font-bold">
                    {item.eyebrow}
                  </span>
                  <h3 className="font-headline-md text-[20px] font-bold text-on-surface">{item.title}</h3>
                  <p className="font-body-md text-[15px] text-on-surface-variant leading-relaxed flex-1">
                    {item.text}
                  </p>
                  <span className="mt-2 font-headline-sm text-[14px] font-bold text-brand-red inline-flex items-center gap-1">
                    {item.action}
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
                      chevron_left
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="w-full py-16 md:py-24 bg-surface-container-low/60 scroll-mt-28">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="max-w-2xl mb-10 md:mb-12">
            <h2 className="font-headline-lg text-[26px] md:text-[32px] font-extrabold text-on-surface">
              آدم‌های پشت روتینو
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
              هر گفت‌وگو، تصویر و تجربه‌ای که در روتینو می‌بینید، حاصل همکاری آدم‌هایی با مهارت‌ها و نگاه‌های
              متفاوت است.
            </p>
          </div>

          {members.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {members.map((member) => (
                <li key={`${member.order}-${member.name}`}>
                  <article className="h-full rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] overflow-hidden flex flex-col">
                    <AboutImage
                      src={member.image}
                      alt={`پرتره ${member.name}`}
                      placeholderLabel="عکس پرتره"
                      placeholderPath={member.image || '/images/team/member.jpg'}
                      className="aspect-[3/4]"
                      imgClassName="h-full w-full object-cover object-top"
                    />
                    <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
                      <h3 className="font-headline-md text-[20px] font-bold text-on-surface">{member.name}</h3>
                      <p className="text-[13px] font-bold text-brand-red">{member.role}</p>
                      <p className="font-body-md text-[15px] text-on-surface-variant leading-relaxed">
                        {member.shortBio}
                      </p>
                      <TeamSocials links={member.socialLinks} />
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {['member-01', 'member-02', 'member-03'].map((slot) => (
                <li key={slot}>
                  <article className="h-full rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] overflow-hidden flex flex-col">
                    <AboutImage
                      alt="جایگاه عکس پرتره عضو تیم روتینو"
                      placeholderLabel="عکس پرتره عضو تیم"
                      placeholderPath={`/images/team/${slot}.jpg`}
                      className="aspect-[3/4]"
                    />
                    <div className="p-5 md:p-6 flex flex-col gap-2">
                      <p className="font-headline-sm text-[15px] font-bold text-on-surface">
                        معرفی این عضو هنوز ثبت نشده است.
                      </p>
                      <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                        نام، نقش، متن کوتاه و در صورت وجود لینک شبکه اجتماعی را در فایل داده تیم وارد
                        کنید.
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <h2 className="font-headline-lg text-[26px] md:text-[32px] font-extrabold text-on-surface mb-10">
            نگاه و ارزش‌های ما
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {values.map((item) => (
              <li
                key={item.title}
                className="p-6 md:p-7 rounded-[1.75rem] border border-outline-variant/40 bg-[#fcfaf7] flex flex-col gap-4"
              >
                <span className="w-11 h-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                    {item.icon}
                  </span>
                </span>
                <h3 className="font-headline-md text-[20px] font-bold text-on-surface">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Future — not active services */}
      <section className="w-full pb-16 md:pb-24">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="rounded-[1.75rem] border border-outline-variant/40 bg-surface-container-low px-6 py-10 md:px-12 md:py-14">
            <span className="inline-flex px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange font-label-badge text-label-badge font-bold mb-4">
              در مسیر ساخت
            </span>
            <h2 className="font-headline-lg text-[24px] md:text-[30px] font-extrabold text-on-surface mb-4">
              مسیر آینده روتینو
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-3xl mb-6">
              اپلیکیشن سلامت روتینو در حال ساخت است. کافه، باشگاه و پوشاک ورزشی در برنامه‌های آینده برند
              قرار دارند و هنوز به‌عنوان خدمت فعال ارائه نمی‌شوند.
            </p>
            <Link to="/#future" className={btnSecondary}>
              دیدن مسیر آینده روتینو
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                chevron_left
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact invite */}
      <section className="w-full pb-20 md:pb-24">
        <div className="max-w-[1240px] mx-auto px-gutter-lg">
          <div className="rounded-[1.75rem] bg-[#fcfaf7] border border-outline-variant/40 px-6 py-10 md:px-12 md:py-14">
            <h2 className="font-headline-lg text-[24px] md:text-[30px] font-extrabold text-on-surface mb-6 leading-snug max-w-2xl">
              دوست دارید بیشتر با روتینو آشنا شوید یا با ما همکاری کنید؟
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className={btnPrimary}>
                تماس با ما
              </Link>
              <Link to="/podcast" className={btnSecondary}>
                دیدن برنامه‌ها
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
