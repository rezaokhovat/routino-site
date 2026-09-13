import {
  formatHour,
  formatRange,
  scheduleWeek,
  STUDIO_CLOSE,
  STUDIO_OPEN,
  summarizeDay,
} from './StudioAvailability.data'
import { showcaseVideos } from './videoShowcase.data'

const packageRates = {
  'empty-location': {
    name: 'لوکیشن خالی',
    startRate: 650000,
    endRate: 500000,
    type: 'linear' as const,
  },
  '1-camera': {
    name: '۱ دوربین سینمایی',
    baseHourly: 1600000,
    type: 'camera' as const,
  },
  '2-cameras': {
    name: '۲ دوربین (پیشنهادی)',
    baseHourly: 2000000,
    type: 'camera' as const,
  },
  '3-cameras': {
    name: '۳ دوربین فول‌ست',
    baseHourly: 2400000,
    type: 'camera' as const,
  },
}

type PackageKey = keyof typeof packageRates

function formatFa(num: number | string) {
  return Number(num).toLocaleString('fa-IR')
}

export function bindInteractions(root: HTMLElement) {
  const durationRange = root.querySelector<HTMLInputElement>('#durationRange')
  const durationText = root.querySelector('#durationText')
  const btnMinus = root.querySelector('#btn-minus')
  const btnPlus = root.querySelector('#btn-plus')
  const discountRuleText = root.querySelector('#discountRuleText')
  const receiptPackageName = root.querySelector('#receiptPackageName')
  const receiptDuration = root.querySelector('#receiptDuration')
  const receiptBasePrice = root.querySelector('#receiptBasePrice')
  const receiptDiscountPercent = root.querySelector('#receiptDiscountPercent')
  const receiptDiscountAmount = root.querySelector('#receiptDiscountAmount')
  const receiptHourlyAvg = root.querySelector('#receiptHourlyAvg')
  const receiptFinalTotal = root.querySelector('#receiptFinalTotal')
  const receiptEquipList = root.querySelector('#receiptEquipList')
  const equipCheckboxes = root.querySelectorAll<HTMLInputElement>('.equip-checkbox')
  const equipmentSection = root.querySelector<HTMLElement>('#equipment-section')
  const equipmentFreeBadge = root.querySelector<HTMLElement>('#equipment-free-badge')
  const equipmentDisabledBadge = root.querySelector<HTMLElement>('#equipment-disabled-badge')
  const equipmentHint = root.querySelector<HTMLElement>('#equipment-hint')
  const defaultCheckedEquip = new Set(
    Array.from(equipCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.getAttribute('data-name') || ''),
  )
  let equipmentWasEnabled = true

  if (!durationRange) return () => {}

  function getSelectedPackage(): PackageKey {
    const checked = root.querySelector<HTMLInputElement>(
      'input[name="studio_package"]:checked',
    )
    return (checked?.value as PackageKey) || '2-cameras'
  }

  function setEquipmentEnabled(enabled: boolean) {
    if (enabled === equipmentWasEnabled) return
    equipmentWasEnabled = enabled

    equipCheckboxes.forEach((cb) => {
      cb.disabled = !enabled
      if (!enabled) {
        cb.checked = false
      } else {
        const name = cb.getAttribute('data-name') || ''
        cb.checked = defaultCheckedEquip.has(name)
      }
    })

    if (equipmentSection) {
      equipmentSection.classList.toggle('opacity-50', !enabled)
      equipmentSection.classList.toggle('pointer-events-none', !enabled)
      equipmentSection.setAttribute('aria-disabled', enabled ? 'false' : 'true')
    }
    if (equipmentFreeBadge) {
      equipmentFreeBadge.classList.toggle('hidden', !enabled)
    }
    if (equipmentDisabledBadge) {
      equipmentDisabledBadge.classList.toggle('hidden', enabled)
      equipmentDisabledBadge.classList.toggle('inline-flex', !enabled)
    }
    if (equipmentHint) {
      equipmentHint.textContent = enabled
        ? 'انتخاب تجهیزات این بخش هزینهٔ جداگانه‌ای به پکیج‌های دوربین اضافه نمی‌کند؛ فقط برای آماده‌سازی اولیه قبل از ورود شماست.'
        : 'در پکیج لوکیشن خالی، تجهیزات صدا و نور قابل انتخاب نیست و در پیش‌فاکتور لحاظ نمی‌شود.'
    }
  }

  function calculateRoutinoPrice() {
    const pkgKey = getSelectedPackage()
    const pkgData = packageRates[pkgKey]
    const hours = parseInt(durationRange!.value, 10)

    setEquipmentEnabled(pkgKey !== 'empty-location')

    if (durationText) durationText.textContent = formatFa(hours) + ' ساعت'
    if (receiptDuration) receiptDuration.textContent = formatFa(hours) + ' ساعت'
    if (receiptPackageName) receiptPackageName.textContent = pkgData.name

    ;(['empty-location', '1-camera', '2-cameras', '3-cameras'] as PackageKey[]).forEach(
      (key) => {
        const card = root.querySelector('#card-' + key)
        if (!card) return
        if (key === pkgKey) {
          card.classList.add('border-brand-red', 'bg-brand-red/5', 'ring-1', 'ring-brand-red')
          card.classList.remove('border-outline-variant/40', 'bg-surface')
        } else {
          card.classList.remove(
            'border-brand-red',
            'bg-brand-red/5',
            'ring-1',
            'ring-brand-red',
          )
          card.classList.add('border-outline-variant/40', 'bg-surface')
        }
      },
    )

    let basePrice = 0
    let finalPrice = 0
    let discountAmount = 0
    let discountPercent: number | string = 0

    if (pkgData.type === 'linear') {
      const hourlyRate =
        hours === 1
          ? pkgData.startRate
          : pkgData.startRate -
            ((hours - 1) / 11) * (pkgData.startRate - pkgData.endRate)

      basePrice = pkgData.startRate * hours
      finalPrice = Math.round(hourlyRate * hours)
      discountAmount = basePrice - finalPrice
      discountPercent = basePrice > 0 ? ((discountAmount / basePrice) * 100).toFixed(1) : 0

      if (discountRuleText) {
        discountRuleText.textContent =
          'کاهش نرخ ساعتی از ۶۵۰ به ' +
          formatFa(Math.round(hourlyRate)) +
          ' تومان برای ' +
          formatFa(hours) +
          ' ساعت'
      }
    } else {
      basePrice = pkgData.baseHourly * hours
      const discountSteps = Math.floor(hours / 2)
      discountPercent = discountSteps * 2.5
      discountAmount = Math.round(basePrice * (discountPercent / 100))
      finalPrice = basePrice - discountAmount

      if (discountRuleText) {
        if (discountPercent > 0) {
          discountRuleText.textContent =
            'تخفیف ' +
            formatFa(discountPercent) +
            '٪ روتینو (' +
            formatFa(discountSteps) +
            ' پله ۲ ساعته)'
        } else {
          discountRuleText.textContent =
            'برای دریافت تخفیف پلکانی، مدت زمان را حداقل ۲ ساعت انتخاب کنید.'
        }
      }
    }

    const hourlyAvg = Math.round(finalPrice / hours)

    if (receiptBasePrice) receiptBasePrice.textContent = formatFa(basePrice) + ' تومان'
    if (receiptDiscountPercent)
      receiptDiscountPercent.textContent = '(' + formatFa(discountPercent) + '٪)'
    if (receiptDiscountAmount) {
      receiptDiscountAmount.textContent =
        discountAmount > 0 ? '-' + formatFa(discountAmount) + ' تومان' : '۰ تومان'
    }
    if (receiptHourlyAvg) receiptHourlyAvg.textContent = formatFa(hourlyAvg) + ' تومان'
    if (receiptFinalTotal) receiptFinalTotal.textContent = formatFa(finalPrice)

    if (receiptEquipList) {
      receiptEquipList.innerHTML = ''
      if (pkgKey === 'empty-location') {
        receiptEquipList.innerHTML =
          '<li class="text-on-surface-variant">در لوکیشن خالی تجهیزات همراه ارائه نمی‌شود.</li>'
      } else {
        let hasEquip = false
        equipCheckboxes.forEach((cb) => {
          if (cb.checked) {
            hasEquip = true
            const li = document.createElement('li')
            li.className = 'flex items-center gap-1.5'
            li.innerHTML =
              '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span><span>' +
              (cb.getAttribute('data-name') || '') +
              '</span>'
            receiptEquipList.appendChild(li)
          }
        })
        if (!hasEquip) {
          receiptEquipList.innerHTML =
            '<li class="text-on-surface-variant">هیچ تجهیز جانبی انتخاب نشده است.</li>'
        }
      }
    }
  }

  const onDurationInput = () => calculateRoutinoPrice()
  durationRange.addEventListener('input', onDurationInput)

  const onMinus = () => {
    const val = parseInt(durationRange.value, 10)
    if (val > 1) {
      durationRange.value = String(val - 1)
      calculateRoutinoPrice()
    }
  }
  const onPlus = () => {
    const val = parseInt(durationRange.value, 10)
    if (val < 12) {
      durationRange.value = String(val + 1)
      calculateRoutinoPrice()
    }
  }
  btnMinus?.addEventListener('click', onMinus)
  btnPlus?.addEventListener('click', onPlus)

  const packageRadios = root.querySelectorAll('input[name="studio_package"]')
  packageRadios.forEach((radio) =>
    radio.addEventListener('change', calculateRoutinoPrice),
  )
  equipCheckboxes.forEach((cb) => cb.addEventListener('change', calculateRoutinoPrice))

  calculateRoutinoPrice()

  // Gallery slider
  const sliderWrapper = root.querySelector('#studio-image-slider-wrapper')
  const slides = root.querySelectorAll('#slider-track .slider-slide')
  const dots = root.querySelectorAll('#slider-dots .slider-dot')
  const btnPrev = root.querySelector('#slider-btn-prev')
  const btnNext = root.querySelector('#slider-btn-next')
  let currentSlide = 0
  let autoplayTimer: ReturnType<typeof setInterval> | null = null
  const totalSlides = slides.length

  function goToSlide(index: number) {
    if (totalSlides === 0) return
    if (index < 0) currentSlide = totalSlides - 1
    else if (index >= totalSlides) currentSlide = 0
    else currentSlide = index

    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0')
        slide.classList.add('opacity-100', 'z-10')
      } else {
        slide.classList.remove('opacity-100', 'z-10')
        slide.classList.add('opacity-0', 'pointer-events-none', 'z-0')
      }
    })

    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.className =
          'slider-dot w-6 h-2 rounded-full bg-brand-red transition-all duration-300'
      } else {
        dot.className =
          'slider-dot w-2 h-2 rounded-full bg-white/70 hover:bg-white transition-all duration-300'
      }
    })
  }

  const nextSlide = () => goToSlide(currentSlide + 1)
  const prevSlide = () => goToSlide(currentSlide - 1)

  function startAutoplay() {
    stopAutoplay()
    if (totalSlides > 1) autoplayTimer = setInterval(nextSlide, 4000)
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer)
      autoplayTimer = null
    }
  }

  const onPrev = () => {
    prevSlide()
    startAutoplay()
  }
  const onNext = () => {
    nextSlide()
    startAutoplay()
  }
  btnPrev?.addEventListener('click', onPrev)
  btnNext?.addEventListener('click', onNext)

  const dotHandlers: Array<() => void> = []
  dots.forEach((dot) => {
    const handler = () => {
      const targetIndex = parseInt(dot.getAttribute('data-slide-to') || '0', 10)
      goToSlide(targetIndex)
      startAutoplay()
    }
    dotHandlers.push(handler)
    dot.addEventListener('click', handler)
  })

  sliderWrapper?.addEventListener('mouseenter', stopAutoplay)
  sliderWrapper?.addEventListener('mouseleave', startAutoplay)
  startAutoplay()

  const unbindSchedule = bindStudioSchedule(root)
  const unbindVideo = bindVideoShowcase(root)

  return () => {
    durationRange.removeEventListener('input', onDurationInput)
    btnMinus?.removeEventListener('click', onMinus)
    btnPlus?.removeEventListener('click', onPlus)
    packageRadios.forEach((radio) =>
      radio.removeEventListener('change', calculateRoutinoPrice),
    )
    equipCheckboxes.forEach((cb) =>
      cb.removeEventListener('change', calculateRoutinoPrice),
    )
    btnPrev?.removeEventListener('click', onPrev)
    btnNext?.removeEventListener('click', onNext)
    dots.forEach((dot, i) => dot.removeEventListener('click', dotHandlers[i]))
    sliderWrapper?.removeEventListener('mouseenter', stopAutoplay)
    sliderWrapper?.removeEventListener('mouseleave', startAutoplay)
    stopAutoplay()
    unbindSchedule()
    unbindVideo()
  }
}

function bindStudioSchedule(root: HTMLElement) {
  const tabsEl = root.querySelector('#schedule-day-tabs')
  const titleEl = root.querySelector('#schedule-day-title span:last-child')
  const freeSummaryEl = root.querySelector('#schedule-day-free-summary')
  const weekSummaryEl = root.querySelector('#schedule-week-summary')
  const axisEl = root.querySelector('#schedule-hour-axis')
  const timelineEl = root.querySelector('#schedule-timeline')
  const hourGridEl = root.querySelector('#schedule-hour-grid')
  const listEl = root.querySelector('#schedule-slot-list')

  if (!tabsEl || !timelineEl || !listEl) return () => {}

  let activeId =
    scheduleWeek.find((d) => d.isToday)?.id ?? scheduleWeek[0].id

  const weekBooked = scheduleWeek.reduce((n, d) => n + summarizeDay(d).booked, 0)
  const weekAvailable = scheduleWeek.reduce((n, d) => n + summarizeDay(d).available, 0)
  if (weekSummaryEl) {
    weekSummaryEl.textContent = `این هفته: ${weekAvailable.toLocaleString('fa-IR')} ساعت آزاد / ${weekBooked.toLocaleString('fa-IR')} ساعت رزرو`
  }

  if (axisEl) {
    axisEl.innerHTML = ''
    for (let h = STUDIO_OPEN; h <= STUDIO_CLOSE; h += 2) {
      const span = document.createElement('span')
      span.textContent = formatHour(h)
      axisEl.appendChild(span)
    }
  }

  function renderTabs() {
    tabsEl!.innerHTML = ''
    scheduleWeek.forEach((day) => {
      const s = summarizeDay(day)
      const active = day.id === activeId
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = `shrink-0 min-w-[108px] rounded-2xl border-2 px-3 py-3 text-right transition-all ${
        active
          ? 'border-brand-red bg-brand-red/5 ring-1 ring-brand-red'
          : 'border-outline-variant/40 bg-surface hover:border-brand-red/50'
      }`
      btn.innerHTML = `
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="font-headline-sm text-[14px] font-bold text-on-surface">${day.weekday}</span>
          ${day.isToday ? '<span class="px-1.5 py-0.5 rounded bg-brand-red text-[10px] text-on-primary font-bold">امروز</span>' : ''}
          ${day.closed ? '<span class="px-1.5 py-0.5 rounded bg-on-surface-variant/20 text-[10px] text-on-surface-variant font-bold">تعطیل</span>' : ''}
        </div>
        <div class="text-[12px] text-on-surface-variant mb-2">${day.dateLabel}</div>
        ${
          day.closed
            ? '<div class="text-[11px] text-on-surface-variant">بدون آفیش</div>'
            : `<div class="flex items-center gap-1.5 text-[11px] font-bold">
                <span class="text-emerald-700">${s.available.toLocaleString('fa-IR')}خ</span>
                <span class="text-outline-variant">·</span>
                <span class="text-brand-red">${s.booked.toLocaleString('fa-IR')}ر</span>
              </div>`
        }
      `
      btn.addEventListener('click', () => {
        activeId = day.id
        render()
      })
      tabsEl!.appendChild(btn)
    })
  }

  function renderDay() {
    const day = scheduleWeek.find((d) => d.id === activeId) ?? scheduleWeek[0]
    const summary = summarizeDay(day)

    if (titleEl) titleEl.textContent = `برنامهٔ ${day.weekday} — ${day.dateLabel}`
    if (freeSummaryEl) {
      freeSummaryEl.textContent = day.closed
        ? ''
        : `${summary.available.toLocaleString('fa-IR')} ساعت خالی از ${(STUDIO_CLOSE - STUDIO_OPEN).toLocaleString('fa-IR')} ساعت`
    }

    timelineEl!.innerHTML = ''
    if (day.closed) {
      timelineEl!.innerHTML =
        '<div class="w-full h-full flex items-center justify-center text-on-surface-variant text-sm font-semibold">استودیو در این روز تعطیل است</div>'
    } else {
      const total = STUDIO_CLOSE - STUDIO_OPEN
      day.slots.forEach((slot) => {
        const width = ((slot.end - slot.start) / total) * 100
        const booked = slot.status === 'booked'
        const seg = document.createElement('div')
        seg.style.width = `${width}%`
        seg.className = `h-full flex items-center justify-center px-1 text-[11px] font-bold truncate border-l border-white/40 first:border-l-0 ${
          booked
            ? 'bg-gradient-to-l from-brand-red to-brand-orange text-on-primary'
            : 'bg-emerald-100 text-emerald-800'
        }`
        seg.title = booked
          ? `${formatRange(slot.start, slot.end)} — رزرو شده${slot.label ? ` (${slot.label})` : ''}`
          : `${formatRange(slot.start, slot.end)} — آزاد`
        seg.innerHTML = `<span class="hidden sm:inline truncate">${booked ? slot.label || 'رزرو' : 'آزاد'}</span>`
        timelineEl!.appendChild(seg)
      })
    }

    if (hourGridEl) {
      hourGridEl.innerHTML = ''
      for (let hour = STUDIO_OPEN; hour < STUDIO_CLOSE; hour++) {
        const cell = document.createElement('div')
        if (day.closed) {
          cell.className =
            'rounded-lg py-2 text-center text-[11px] bg-surface-container text-on-surface-variant'
        } else {
          const slot = day.slots.find((s) => hour >= s.start && hour < s.end)
          const booked = slot?.status === 'booked'
          cell.className = `rounded-lg py-2 text-center text-[11px] font-bold border ${
            booked
              ? 'bg-brand-red/10 border-brand-red/30 text-brand-red'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`
        }
        cell.textContent = formatHour(hour)
        hourGridEl.appendChild(cell)
      }
    }

    listEl!.innerHTML = ''
    if (day.closed) {
      listEl!.innerHTML =
        '<li class="text-sm text-on-surface-variant leading-relaxed">استودیو در این روز تعطیل است. ساعات کاری عادی شنبه تا جمعه از ۱۰ صبح تا ۱۰ شب می‌باشد. برای رزرو با شماره ۰۹۹۰۳۷۶۰۸۶۷ تماس بگیرید.</li>'
      return
    }

    day.slots.forEach((slot) => {
      const booked = slot.status === 'booked'
      const li = document.createElement('li')
      li.className = `flex items-start gap-3 p-3 rounded-xl border ${
        booked ? 'bg-brand-red/5 border-brand-red/20' : 'bg-emerald-50/80 border-emerald-200/80'
      }`
      li.innerHTML = `
        <span class="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          booked ? 'bg-brand-red text-on-primary' : 'bg-emerald-500 text-white'
        }">
          <span class="material-symbols-outlined text-[18px]">${booked ? 'event_busy' : 'event_available'}</span>
        </span>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold text-[13px] text-on-surface">${formatRange(slot.start, slot.end)}</span>
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${
              booked ? 'bg-brand-red text-on-primary' : 'bg-emerald-600 text-white'
            }">${booked ? 'رزرو شده' : 'خالی'}</span>
          </div>
          <p class="text-[12px] text-on-surface-variant mt-0.5">
            ${
              booked
                ? slot.label || 'آفیش قطعی'
                : `${(slot.end - slot.start).toLocaleString('fa-IR')} ساعت قابل رزرو`
            }
          </p>
        </div>
      `
      listEl!.appendChild(li)
    })
  }

  function render() {
    renderTabs()
    renderDay()
  }

  render()
  return () => {
    tabsEl.innerHTML = ''
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function bindVideoShowcase(root: HTMLElement) {
  const reel = root.querySelector<HTMLElement>('#video-reel')
  const btnPrev = root.querySelector('#video-reel-prev')
  const btnNext = root.querySelector('#video-reel-next')
  if (!reel || showcaseVideos.length === 0) return () => {}

  type CardRefs = {
    card: HTMLButtonElement
    video: HTMLVideoElement
    icon: HTMLElement
  }

  const cards: CardRefs[] = []
  let playingId: string | null = null
  let animating = false
  let hoverPaused = false
  let autoTimer: ReturnType<typeof setInterval> | null = null
  const AUTO_MS = 2000
  const SLIDE_MS = 700
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function setPlayingUi(refs: CardRefs, playing: boolean) {
    refs.card.classList.toggle('is-playing', playing)
    refs.icon.textContent = playing ? 'pause' : 'play_arrow'
    refs.card.setAttribute('aria-pressed', playing ? 'true' : 'false')
  }

  function stopCard(refs: CardRefs) {
    refs.video.pause()
    refs.video.currentTime = 0
    setPlayingUi(refs, false)
    if (playingId === refs.card.dataset.id) playingId = null
    startAuto()
  }

  function stopOthers(exceptId: string) {
    cards.forEach((refs) => {
      if (refs.card.dataset.id !== exceptId) {
        refs.video.pause()
        refs.video.currentTime = 0
        setPlayingUi(refs, false)
      }
    })
  }

  async function playCard(refs: CardRefs, src: string) {
    const id = refs.card.dataset.id
    if (!id) return
    stopOthers(id)
    stopAuto()
    if (refs.video.getAttribute('src') !== src) {
      refs.video.src = src
      refs.video.load()
    }
    refs.video.muted = false
    try {
      await refs.video.play()
      playingId = id
      setPlayingUi(refs, true)
    } catch {
      refs.video.muted = true
      try {
        await refs.video.play()
        playingId = id
        setPlayingUi(refs, true)
      } catch {
        setPlayingUi(refs, false)
        startAuto()
      }
    }
  }

  function cardStep() {
    const first = reel.firstElementChild as HTMLElement | null
    if (!first) return 0
    const gap = parseFloat(getComputedStyle(reel).columnGap || getComputedStyle(reel).gap) || 0
    return first.getBoundingClientRect().width + gap
  }

  function canSlide() {
    return !animating && !playingId && reel.children.length > 1
  }

  function finishSlide(onDone: () => void) {
    let settled = false
    const done = (event?: TransitionEvent) => {
      if (settled) return
      if (event && event.target !== reel) return
      settled = true
      reel.removeEventListener('transitionend', done)
      onDone()
      reel.style.transition = 'none'
      reel.style.transform = 'translateX(0)'
      void reel.offsetWidth
      reel.style.transition = ''
      animating = false
    }
    if (reduceMotion) {
      done()
      return
    }
    reel.addEventListener('transitionend', done)
    window.setTimeout(() => done(), SLIDE_MS + 80)
  }

  function goNext() {
    if (!canSlide()) return
    const step = cardStep()
    if (!step) return
    animating = true
    const first = reel.firstElementChild
    if (!first) {
      animating = false
      return
    }
    reel.style.transition = reduceMotion
      ? 'none'
      : `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
    reel.style.transform = `translateX(${step}px)`
    finishSlide(() => {
      reel.appendChild(first)
    })
  }

  function goPrev() {
    if (!canSlide()) return
    const step = cardStep()
    const last = reel.lastElementChild
    if (!step || !last) return
    animating = true
    reel.style.transition = 'none'
    reel.insertBefore(last, reel.firstElementChild)
    reel.style.transform = `translateX(${step}px)`
    void reel.offsetWidth
    reel.style.transition = reduceMotion
      ? 'none'
      : `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
    reel.style.transform = 'translateX(0)'
    finishSlide(() => {})
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer)
    autoTimer = null
  }

  function startAuto() {
    stopAuto()
    if (hoverPaused || playingId || reduceMotion) return
    autoTimer = setInterval(goNext, AUTO_MS)
  }

  const reelCopies = 3
  const reelItems = Array.from({ length: reelCopies }, (_, copy) =>
    showcaseVideos.map((item) => ({
      ...item,
      instanceId: `${item.id}-${copy}`,
    })),
  ).flat()

  reelItems.forEach((item) => {
    const card = document.createElement('button')
    card.type = 'button'
    card.className = 'video-portrait-card'
    card.dataset.id = item.instanceId
    card.setAttribute('aria-label', `پخش ${item.title}`)
    card.setAttribute('aria-pressed', 'false')
    card.innerHTML = `
      <img class="video-portrait-media" src="${escapeHtml(item.poster)}" alt="${escapeHtml(item.title)}" />
      <video class="video-portrait-media video-portrait-clip" playsinline preload="none" poster="${escapeHtml(item.poster)}"></video>
      <span class="video-portrait-shade"></span>
      <span class="video-portrait-play">
        <span class="video-portrait-play-icon">
          <span class="material-symbols-outlined text-[28px] ml-0.5">play_arrow</span>
        </span>
      </span>
      <div class="video-portrait-copy">
        <p class="video-portrait-quote">${escapeHtml(item.title)}</p>
        <p class="video-portrait-sub">${escapeHtml(item.subtitle)}</p>
        <div class="video-portrait-brand">
          <span class="material-symbols-outlined">videocam</span>
          <span>روتینو</span>
        </div>
      </div>
    `

    const video = card.querySelector('video')
    const icon = card.querySelector('.video-portrait-play-icon .material-symbols-outlined')
    if (!video || !icon) return

    const refs: CardRefs = { card, video, icon }

    const onClick = () => {
      if (playingId === item.instanceId && !video.paused) stopCard(refs)
      else void playCard(refs, item.src)
    }
    const onEnded = () => stopCard(refs)
    const onPause = () => {
      if (video.ended) return
      if (playingId === item.instanceId && video.paused) {
        setPlayingUi(refs, false)
        playingId = null
        startAuto()
      }
    }
    const onPlay = () => {
      setPlayingUi(refs, true)
      stopAuto()
    }

    card.addEventListener('click', onClick)
    video.addEventListener('ended', onEnded)
    video.addEventListener('pause', onPause)
    video.addEventListener('play', onPlay)

    cards.push(refs)
    reel.appendChild(card)
  })

  const onPrev = () => {
    goPrev()
    startAuto()
  }
  const onNext = () => {
    goNext()
    startAuto()
  }
  const onEnter = () => {
    hoverPaused = true
    stopAuto()
  }
  const onLeave = () => {
    hoverPaused = false
    startAuto()
  }

  btnPrev?.addEventListener('click', onPrev)
  btnNext?.addEventListener('click', onNext)
  reel.addEventListener('mouseenter', onEnter)
  reel.addEventListener('mouseleave', onLeave)

  startAuto()

  return () => {
    stopAuto()
    btnPrev?.removeEventListener('click', onPrev)
    btnNext?.removeEventListener('click', onNext)
    reel.removeEventListener('mouseenter', onEnter)
    reel.removeEventListener('mouseleave', onLeave)
    cards.forEach((refs) => {
      refs.video.pause()
      refs.card.remove()
    })
    reel.innerHTML = ''
  }
}
