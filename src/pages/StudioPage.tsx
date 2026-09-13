import { useEffect, useRef } from 'react'
import { bindInteractions } from '../bindInteractions'
import { pageHtml } from '../pageHtml'

export function StudioPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    return bindInteractions(rootRef.current)
  }, [])

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: pageHtml }} />
}
