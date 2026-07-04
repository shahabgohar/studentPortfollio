import { defineNuxtPlugin } from '#app'

/**
 * Fires a GA4 `generate_lead` event whenever a visitor clicks a high-intent
 * CTA — the cal.com booking link, an email (mailto) link, a SuiteCRM Store
 * listing, or the LinkedIn profile. One global listener covers every CTA on
 * every page, so new buttons are tracked automatically.
 *
 * In GA4: Admin → Events → toggle `generate_lead` as a "Key event" to count
 * these as conversions. The `method` param lets you segment by CTA type.
 */
export default defineNuxtPlugin(() => {
  const { gtag } = useGtag()

  const classify = (href: string): string | null => {
    if (!href) return null
    if (href.startsWith('mailto:')) return 'email'
    if (href.includes('cal.com')) return 'book_call'
    if (href.includes('store.suitecrm.com')) return 'suitecrm_store'
    if (href.includes('linkedin.com')) return 'linkedin'
    if (href.startsWith('https://join.skype.com')) return 'skype'
    return null
  }

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''
      const method = classify(href)
      if (!method) return

      // Pull the pricing tier (utm_content) off booking links so GA4 can tell
      // which package the click came from: sprint-1900 / custom-6500 / crm-retainer.
      let tier: string | undefined
      try {
        tier = new URL(href, window.location.origin).searchParams.get('utm_content') || undefined
      } catch {
        // malformed href — leave tier undefined
      }

      try {
        gtag('event', 'generate_lead', {
          method,
          link_url: href,
          ...(tier ? { tier } : {}),
          page_path:
            typeof window !== 'undefined' ? window.location.pathname : ''
        })
      } catch {
        // analytics is best-effort; never block the click
      }
    },
    { capture: true }
  )
})
