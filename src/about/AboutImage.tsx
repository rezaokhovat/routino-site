import { useState } from 'react'

type AboutImageProps = {
  src?: string
  alt: string
  className?: string
  imgClassName?: string
  placeholderLabel: string
  placeholderPath?: string
  eager?: boolean
}

export function AboutImage({
  src,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  placeholderLabel,
  placeholderPath,
  eager = false,
}: AboutImageProps) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  if (showPlaceholder) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-surface-container text-on-surface-variant border border-dashed border-outline-variant/70 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="material-symbols-outlined text-[28px] text-brand-red/65" aria-hidden="true">
          add_photo_alternate
        </span>
        <span className="font-headline-sm text-[13px] font-bold text-on-surface text-center px-4 leading-snug">
          {placeholderLabel}
        </span>
        {placeholderPath ? (
          <span className="text-[11px] text-on-surface-variant/80 px-4 text-center break-all" dir="ltr">
            {placeholderPath}
          </span>
        ) : null}
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={imgClassName}
      />
    </div>
  )
}
