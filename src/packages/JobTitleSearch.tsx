import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { jobTitles } from './offerPackages'

const fieldClass =
  'w-full min-h-12 rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 font-body-md text-[16px] leading-6 text-on-surface outline-none focus:border-brand-red/60'

function fold(value: string) {
  return value.replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, '').replace(/\s+/g, '').toLowerCase()
}

type Props = {
  value: string
  onChange: (value: string) => void
}

export function JobTitleSearch({ value, onChange }: Props) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const filtered = useMemo(() => {
    const needle = fold(query)
    const matches = needle
      ? jobTitles.filter((title) => title !== 'سایر' && fold(title).includes(needle))
      : jobTitles.filter((title) => title !== 'سایر')
    if (!needle || matches.length === 0 || fold('سایر').includes(needle)) {
      matches.push('سایر')
    }
    return matches
  }, [query])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, open])

  function selectTitle(title: string) {
    onChange(title)
    setQuery(title)
    setOpen(false)
  }

  function onInputChange(next: string) {
    setQuery(next)
    setOpen(true)
    if (value) onChange('')
  }

  return (
    <div ref={rootRef} className="relative">
      <input
        name="jobTitleSearch"
        className={fieldClass}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder="جستجو یا انتخاب عنوان شغلی"
        value={open ? query : value || query}
        onChange={(event) => onInputChange(event.target.value)}
        onFocus={() => {
          setQuery(value || query)
          setOpen(true)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
            setActiveIndex((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)))
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActiveIndex((index) => Math.max(index - 1, 0))
          } else if (event.key === 'Enter' && open && filtered[activeIndex]) {
            event.preventDefault()
            selectTitle(filtered[activeIndex])
          } else if (event.key === 'Escape') {
            setOpen(false)
          }
        }}
      />
      <input type="hidden" name="jobTitle" value={value} required />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto overscroll-contain rounded-xl border border-outline-variant/40 bg-surface-container-lowest py-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-[14px] text-on-surface-variant">موردی پیدا نشد. «سایر» را انتخاب کنید.</li>
          ) : (
            filtered.map((title, index) => (
              <li key={title} role="option" aria-selected={title === value}>
                <button
                  type="button"
                  className={`w-full min-h-11 px-4 py-2.5 text-right text-[15px] leading-6 ${
                    index === activeIndex ? 'bg-brand-red/10 text-on-surface font-bold' : 'text-on-surface'
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectTitle(title)}
                >
                  {title}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  )
}
