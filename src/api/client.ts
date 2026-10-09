export const AUTH_TOKEN_KEY = 'routino.token'

export type ApiUser = {
  id: string
  mobile: string
  createdAt: string
}

export type AuthResponse = {
  token: string
  user: ApiUser
}

export type ScheduleSlot = {
  start: number
  end: number
  status: 'available' | 'booked'
  label?: string | null
}

export type ScheduleDay = {
  id: string
  date: string
  weekday: string
  dateLabel: string
  isToday?: boolean
  closed?: boolean
  slots: ScheduleSlot[]
}

export type BusinessSupportLead = {
  id: string
  jobTitle: string
  mobile: string
  instagram: string
  otherSocials?: string | null
  createdAt: string
  dateLabel: string
  linkedToAccount: boolean
}

export type Reservation = {
  id: string
  date: string
  startHour: number
  endHour: number
  status: 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
  weekday: string
  dateLabel: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(AUTH_TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token: string | null) {
  if (typeof window === 'undefined') return
  try {
    if (token) window.localStorage.setItem(AUTH_TOKEN_KEY, token)
    else window.localStorage.removeItem(AUTH_TOKEN_KEY)
  } catch {
    /* ignore quota / private mode */
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(path, { ...init, headers })
  const text = await response.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { error: text }
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data && typeof data.error === 'string'
        ? data.error
        : 'ارتباط با سرور برقرار نشد.'
    throw new ApiError(message, response.status)
  }

  return data as T
}
