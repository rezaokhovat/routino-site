import { Link } from 'react-router-dom'

type RoutinoLogoProps = {
  /** مسیر لینک؛ اگر false باشد فقط تصویر نمایش داده می‌شود */
  to?: string | false
  className?: string
  /** ارتفاع لوگو به پیکسل (عرض خودکار) */
  height?: number
  onClick?: () => void
}

export function RoutinoLogo({
  to = '/',
  className = '',
  height = 44,
  onClick,
}: RoutinoLogoProps) {
  const img = (
    <img
      src="/brand/routino-logo.png"
      alt="روتینو (Routino)"
      width={height}
      height={height}
      className="object-contain rounded-xl shadow-[0_4px_16px_rgba(217,31,64,0.25)]"
      style={{ width: height, height }}
    />
  )

  if (to === false) {
    return <span className={`inline-flex items-center shrink-0 ${className}`}>{img}</span>
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`inline-flex items-center shrink-0 group ${className}`}
      aria-label="روتینو — صفحه اصلی"
    >
      {img}
    </Link>
  )
}
