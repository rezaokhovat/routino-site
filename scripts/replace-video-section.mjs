import fs from 'fs'

let html = fs.readFileSync('body.html', 'utf8')
const startMarker = '<!-- Slider Card 2: Video Portfolio Showcase -->'
const start = html.indexOf(startMarker)
if (start < 0) throw new Error('start not found')

const sectionClose = html.indexOf('</section>', start)
const beforeSection = html.lastIndexOf('</div>', sectionClose)
const card2End = html.lastIndexOf('</div>', beforeSection)
const replaceEnd = card2End + 6

const newCard = `<!-- Slider Card 2: Video Portfolio Showcase -->
<div class="w-full" id="video-showcase">
<div class="mb-8 text-center lg:text-right max-w-[1240px] mx-auto px-gutter-lg">
<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 text-brand-red font-label-badge text-label-badge font-bold mb-3">
<span class="material-symbols-outlined text-[16px]">movie</span>
<span>آرشیو خروجی‌های ضبط‌شده در استودیو</span>
</div>
<h2 class="font-headline-lg text-headline-lg font-bold text-on-surface">خروجی و نمونه <span class="text-brand-orange">ویدئوهای روتینو</span></h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-2 max-w-3xl mx-auto lg:mx-0">نمونه‌ویدیوهای واقعی استودیو را ببینید؛ اسلایدر به‌صورت خودکار عوض می‌شود و با یک کلیک می‌توانید هر ویدیو را پخش کنید.</p>
</div>

<div class="relative w-full max-w-[1400px] mx-auto px-3 sm:px-gutter-lg" id="video-slider-root">
<div class="relative rounded-3xl overflow-hidden bg-brand-charcoal shadow-2xl shadow-brand-red/15 border border-outline-variant/20 aspect-video max-h-[78vh] min-h-[240px]">
<video class="absolute inset-0 w-full h-full object-cover" id="showcase-video" playsinline preload="metadata" poster="/images/0.jpg"></video>

<div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-transparent to-brand-charcoal/30 pointer-events-none" id="video-gradient"></div>

<button type="button" id="video-play-overlay" class="absolute inset-0 z-10 flex items-center justify-center group" aria-label="پخش ویدیو">
<span class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-red/90 text-on-primary flex items-center justify-center shadow-xl shadow-brand-red/40 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[40px] md:text-[48px] ml-1">play_arrow</span>
</span>
</button>

<button type="button" id="video-btn-prev" class="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-charcoal/60 backdrop-blur-md text-on-primary border border-white/15 hover:bg-brand-red transition-colors flex items-center justify-center" aria-label="ویدئوی قبلی">
<span class="material-symbols-outlined text-[28px]">chevron_right</span>
</button>
<button type="button" id="video-btn-next" class="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-charcoal/60 backdrop-blur-md text-on-primary border border-white/15 hover:bg-brand-red transition-colors flex items-center justify-center" aria-label="ویدئوی بعدی">
<span class="material-symbols-outlined text-[28px]">chevron_left</span>
</button>

<div class="absolute bottom-0 inset-x-0 z-20 p-4 md:p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
<div class="min-w-0">
<p class="text-[11px] font-bold text-brand-orange mb-1" id="video-slide-index">۱ / ۵</p>
<h3 class="font-headline-sm text-[18px] md:text-[22px] font-bold text-on-primary truncate" id="video-title">عنوان</h3>
<p class="text-[12px] md:text-[13px] text-secondary-fixed truncate" id="video-subtitle">زیرعنوان</p>
</div>
<div class="flex items-center gap-2">
<button type="button" id="video-toggle-play" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-on-primary text-brand-charcoal text-[13px] font-bold hover:bg-brand-orange hover:text-on-primary transition-colors">
<span class="material-symbols-outlined text-[18px]" id="video-toggle-icon">play_arrow</span>
<span id="video-toggle-label">پخش</span>
</button>
<button type="button" id="video-toggle-auto" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 text-on-primary text-[12px] font-bold border border-white/15 hover:bg-white/20 transition-colors" title="تعویض خودکار">
<span class="material-symbols-outlined text-[16px]">autorenew</span>
<span id="video-auto-label">خودکار روشن</span>
</button>
</div>
</div>

<div class="absolute top-4 left-4 z-20 h-1 w-28 md:w-40 rounded-full bg-white/20 overflow-hidden" id="video-auto-progress-track">
<div class="h-full w-0 bg-brand-orange transition-[width] duration-100 ease-linear" id="video-auto-progress"></div>
</div>
</div>

<div class="mt-4 flex gap-3 overflow-x-auto pb-2" id="video-thumbs"></div>
</div>
</div>`

html = html.slice(0, start) + newCard + html.slice(replaceEnd)
fs.writeFileSync('body.html', html)
console.log('ok', html.includes('video-showcase'), 'len', replaceEnd - start)
