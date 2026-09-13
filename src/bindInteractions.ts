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

function bindVideoShowcase(root: HTMLElement) {
  const video = root.querySelector<HTMLVideoElement>('#showcase-video')
  const titleEl = root.querySelector('#video-title')
  const subtitleEl = root.querySelector('#video-subtitle')
  const indexEl = root.querySelector('#video-slide-index')
  const thumbsEl = root.querySelector('#video-thumbs')
  const playOverlay = root.querySelector<HTMLButtonElement>('#video-play-overlay')
  const btnPrev = root.querySelector('#video-btn-prev')
  const btnNext = root.querySelector('#video-btn-next')
  const togglePlay = root.querySelector('#video-toggle-play')
  const toggleIcon = root.querySelector('#video-toggle-icon')
  const toggleLabel = root.querySelector('#video-toggle-label')
  const toggleAuto = root.querySelector('#video-toggle-auto')
  const autoLabel = root.querySelector('#video-auto-label')
  const progressEl = root.querySelector<HTMLElement>('#video-auto-progress')
  const rootEl = root.querySelector('#video-slider-root')

  if (!video || !thumbsEl || showcaseVideos.length === 0) return () => {}
  const player = video

  let index = 0
  let autoEnabled = true
  let autoTimer: ReturnType<typeof setInterval> | null = null
  let progressTimer: ReturnType<typeof setInterval> | null = null
  let progress = 0
  const AUTO_MS = 7000
  const PROGRESS_TICK = 100

  function stopAutoTimers() {
    if (autoTimer) clearInterval(autoTimer)
    if (progressTimer) clearInterval(progressTimer)
    autoTimer = null
    progressTimer = null
    progress = 0
    if (progressEl) progressEl.style.width = '0%'
  }

  function startAutoTimers() {
    stopAutoTimers()
    if (!autoEnabled || !player.paused) return
    progressTimer = setInterval(() => {
      progress += PROGRESS_TICK
      if (progressEl) {
        progressEl.style.width = `${Math.min(100, (progress / AUTO_MS) * 100)}%`
      }
    }, PROGRESS_TICK)
    autoTimer = setInterval(() => {
      goTo((index + 1) % showcaseVideos.length, false)
    }, AUTO_MS)
  }

  function updatePlayUi(playing: boolean) {
    if (playOverlay) playOverlay.classList.toggle('hidden', playing)
    if (toggleIcon) toggleIcon.textContent = playing ? 'pause' : 'play_arrow'
    if (toggleLabel) toggleLabel.textContent = playing ? 'توقف' : 'پخش'
  }

  function renderThumbs() {
    thumbsEl!.innerHTML = ''
    showcaseVideos.forEach((item, i) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = `shrink-0 relative w-[140px] md:w-[180px] aspect-video rounded-xl overflow-hidden border-2 transition-all ${
        i === index
          ? 'border-brand-red ring-2 ring-brand-red/30'
          : 'border-transparent opacity-80 hover:opacity-100'
      }`
      btn.innerHTML = `
        <img src="${item.poster}" alt="${item.title}" class="w-full h-full object-cover" />
        <span class="absolute inset-0 bg-brand-charcoal/35"></span>
        <span class="absolute bottom-1 inset-x-1 text-[10px] font-bold text-on-primary truncate text-right px-1">${item.title}</span>
      `
      btn.addEventListener('click', () => goTo(i, true))
      thumbsEl!.appendChild(btn)
    })
  }

  function goTo(nextIndex: number, userAction: boolean) {
    index = nextIndex
    const item = showcaseVideos[index]
    const wasPlaying = !video!.paused

    video!.pause()
    video!.removeAttribute('src')
    video!.poster = item.poster
    video!.src = item.src
    video!.load()

    if (titleEl) titleEl.textContent = item.title
    if (subtitleEl) subtitleEl.textContent = item.subtitle
    if (indexEl) {
      indexEl.textContent = `${(index + 1).toLocaleString('fa-IR')} / ${showcaseVideos.length.toLocaleString('fa-IR')}`
    }
    renderThumbs()
    updatePlayUi(false)

    if (userAction) {
      startAutoTimers()
    } else if (autoEnabled) {
      startAutoTimers()
    }

    if (wasPlaying && userAction) {
      void video!.play().then(() => updatePlayUi(true)).catch(() => updatePlayUi(false))
      stopAutoTimers()
    }
  }

  async function playVideo() {
    try {
      await video!.play()
      updatePlayUi(true)
      stopAutoTimers()
    } catch {
      updatePlayUi(false)
    }
  }

  function pauseVideo() {
    video!.pause()
    updatePlayUi(false)
    if (autoEnabled) startAutoTimers()
  }

  const onOverlay = () => void playVideo()
  const onTogglePlay = () => {
    if (video!.paused) void playVideo()
    else pauseVideo()
  }
  const onPrev = () => {
    goTo((index - 1 + showcaseVideos.length) % showcaseVideos.length, true)
  }
  const onNext = () => {
    goTo((index + 1) % showcaseVideos.length, true)
  }
  const onToggleAuto = () => {
    autoEnabled = !autoEnabled
    if (autoLabel) autoLabel.textContent = autoEnabled ? 'خودکار روشن' : 'خودکار خاموش'
    if (autoEnabled && video!.paused) startAutoTimers()
    else stopAutoTimers()
  }
  const onEnded = () => {
    updatePlayUi(false)
    goTo((index + 1) % showcaseVideos.length, false)
    if (autoEnabled) startAutoTimers()
  }
  const onPlay = () => {
    updatePlayUi(true)
    stopAutoTimers()
  }
  const onPause = () => {
    updatePlayUi(false)
    if (autoEnabled) startAutoTimers()
  }

  playOverlay?.addEventListener('click', onOverlay)
  togglePlay?.addEventListener('click', onTogglePlay)
  btnPrev?.addEventListener('click', onPrev)
  btnNext?.addEventListener('click', onNext)
  toggleAuto?.addEventListener('click', onToggleAuto)
  video.addEventListener('ended', onEnded)
  video.addEventListener('play', onPlay)
  video.addEventListener('pause', onPause)

  const onEnter = () => {
    if (video!.paused) stopAutoTimers()
  }
  const onLeave = () => {
    if (autoEnabled && video!.paused) startAutoTimers()
  }
  rootEl?.addEventListener('mouseenter', onEnter)
  rootEl?.addEventListener('mouseleave', onLeave)

  goTo(0, false)
  startAutoTimers()

  return () => {
    stopAutoTimers()
    playOverlay?.removeEventListener('click', onOverlay)
    togglePlay?.removeEventListener('click', onTogglePlay)
    btnPrev?.removeEventListener('click', onPrev)
    btnNext?.removeEventListener('click', onNext)
    toggleAuto?.removeEventListener('click', onToggleAuto)
    video.removeEventListener('ended', onEnded)
    video.removeEventListener('play', onPlay)
    video.removeEventListener('pause', onPause)
    rootEl?.removeEventListener('mouseenter', onEnter)
    rootEl?.removeEventListener('mouseleave', onLeave)
    video.pause()
  }
}
