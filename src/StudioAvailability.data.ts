export type SlotStatus = 'available' | 'booked'

export type TimeSlot = {
  start: number // hour 10-22
  end: number
  status: SlotStatus
  label?: string
}

export type ScheduleDay = {
  id: string
  weekday: string
  dateLabel: string
  isToday?: boolean
  closed?: boolean
  slots: TimeSlot[]
}

/** ساعات کاری استودیو: ۱۰ صبح تا ۱۰ شب */
export const STUDIO_OPEN = 10
export const STUDIO_CLOSE = 22

export const scheduleWeek: ScheduleDay[] = [
  {
    id: 'sat',
    weekday: 'شنبه',
    dateLabel: '۲۱ شهریور',
    isToday: true,
    slots: [
      { start: 10, end: 12, status: 'booked', label: 'ضبط پادکست' },
      { start: 12, end: 15, status: 'available' },
      { start: 15, end: 19, status: 'booked', label: 'دوره آموزشی' },
      { start: 19, end: 22, status: 'available' },
    ],
  },
  {
    id: 'sun',
    weekday: 'یکشنبه',
    dateLabel: '۲۲ شهریور',
    slots: [
      { start: 10, end: 13, status: 'available' },
      { start: 13, end: 17, status: 'booked', label: 'تولید ریلز' },
      { start: 17, end: 22, status: 'available' },
    ],
  },
  {
    id: 'mon',
    weekday: 'دوشنبه',
    dateLabel: '۲۳ شهریور',
    slots: [
      { start: 10, end: 14, status: 'booked', label: 'مصاحبه تصویری' },
      { start: 14, end: 16, status: 'available' },
      { start: 16, end: 20, status: 'booked', label: 'پادکست گروهی' },
      { start: 20, end: 22, status: 'available' },
    ],
  },
  {
    id: 'tue',
    weekday: 'سه‌شنبه',
    dateLabel: '۲۴ شهریور',
    slots: [
      { start: 10, end: 22, status: 'available' },
    ],
  },
  {
    id: 'wed',
    weekday: 'چهارشنبه',
    dateLabel: '۲۵ شهریور',
    slots: [
      { start: 10, end: 11, status: 'available' },
      { start: 11, end: 15, status: 'booked', label: 'آفیش ۲ دوربین' },
      { start: 15, end: 18, status: 'available' },
      { start: 18, end: 22, status: 'booked', label: 'لایو اینستاگرام' },
    ],
  },
  {
    id: 'thu',
    weekday: 'پنج‌شنبه',
    dateLabel: '۲۶ شهریور',
    slots: [
      { start: 10, end: 13, status: 'booked', label: 'ضبط دوره' },
      { start: 13, end: 19, status: 'available' },
      { start: 19, end: 22, status: 'booked', label: 'پادکست شبانه' },
    ],
  },
  {
    id: 'fri',
    weekday: 'جمعه',
    dateLabel: '۲۷ شهریور',
    slots: [
      { start: 10, end: 14, status: 'available' },
      { start: 14, end: 18, status: 'booked', label: 'ضبط ویژه جمعه' },
      { start: 18, end: 22, status: 'available' },
    ],
  },
]

export function formatHour(h: number) {
  return `${h.toLocaleString('fa-IR')}:۰۰`
}

export function formatRange(start: number, end: number) {
  return `${formatHour(start)} تا ${formatHour(end)}`
}

export function summarizeDay(day: ScheduleDay) {
  if (day.closed) {
    return { booked: 0, available: 0, total: 0 }
  }
  let booked = 0
  let available = 0
  for (const slot of day.slots) {
    const hours = slot.end - slot.start
    if (slot.status === 'booked') booked += hours
    else available += hours
  }
  return { booked, available, total: booked + available }
}
