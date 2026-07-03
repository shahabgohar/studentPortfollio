export interface Project {
  title: string
  category: 'AI' | 'Full-stack' | 'CRM & automation'
  tagline: string
  result: string
  description: string
  tags: string[]
  href?: string
  featured?: boolean
  /** When true, this project is stripped from the HTML for visitors in Pakistan (handled by the Netlify edge function `geo-hide`). */
  hideInPK?: boolean
}

export const projects: Project[] = [
  {
    title: 'AI Lead-Automation Platform',
    category: 'AI',
    tagline: 'WhatsApp → CRM, powered by LLM extraction',
    result: '0 unintended writes against a live production CRM',
    description:
      'Reads inbound WhatsApp conversations and turns them into structured, deduplicated CRM deals for a private healthcare provider. A provider-agnostic LLM engine extracts 13 fields from each chat; a Vue 3 dashboard adds human-in-the-loop review, a "why the AI decided" inspector, and a fail-closed live/dry-run write gate.',
    tags: ['FastAPI', 'Vue 3', 'LiteLLM', 'PostgreSQL', 'HubSpot'],
    featured: true,
  },
  {
    title: 'AI content pipeline',
    category: 'AI',
    tagline: 'Campaign data → expert-reviewed articles',
    result: 'Agents + RAG running safely in production',
    description:
      'A full-stack AI pipeline (FastAPI, Vue 3, PostgreSQL, LangChain) that turns campaign data into expert-reviewed, SEO-optimized articles — with human approval gates, safety auditing, and per-run cost ceilings.',
    tags: ['FastAPI', 'LangChain', 'Vue 3'],
    href: '/services/ai-development',
  },
  {
    title: 'AI voice-agent campaign portal',
    category: 'AI',
    tagline: 'Manage AI calling agents at campaign scale',
    result: 'Per-agent voices, scripts & noise profiles',
    description:
      'A management portal for AI calling campaigns: each campaign runs multiple servers with restart and configuration controls, plus AI voice agents with per-agent voice generation, call scripts, and noise profiles.',
    tags: ['Vue', 'Voice AI', 'Campaign ops'],
  },
  {
    title: 'Real-time AI voice-agent platform',
    category: 'AI',
    tagline: 'Autonomous phone calls on FreeSWITCH + self-hosted GPU inference',
    result: 'Thousands of live calls handled end to end, no human agent',
    description:
      'A production-grade, self-hosted conversational voicebot that autonomously handles thousands of live phone calls in real time. FreeSWITCH manages SIP/RTP and media via the ESL outbound-socket model, while a Python engine runs the business logic: continuous transcription, human-vs-voicemail and ringing detection, dynamic call flows, live call transfers, and disposition handling. The full AI stack is self-hosted for cost and latency control — NVIDIA Parakeet RNNT / Whisper for ASR, Silero for VAD and denoising, F5-TTS for synthesis, and Qwen served via vLLM (benchmarked against DeepSeek-R1, Gemma 3, Phi-4 and Qwen 2.5/3) — running across a fleet of Hetzner GPU servers with automated provisioning, rolling restarts, a watchdog, kernel/firewall tuning, and per-call latency metrics in ClickHouse. Integrated with a ViciDial predictive dialer and SuiteCRM.',
    tags: ['FreeSWITCH', 'Python', 'vLLM', 'Whisper', 'F5-TTS', 'Hetzner GPU', 'ViciDial'],
    hideInPK: true,
  },
  {
    title: 'Call-tracking & analytics platform',
    category: 'Full-stack',
    tagline: 'Real-time performance-marketing dashboards',
    result: 'Live campaign & call-flow analytics',
    description:
      'A Vue 3 front end on a Python FastAPI backend for a performance-marketing call-tracking platform — real-time campaign and call-flow dashboards built for high-volume data.',
    tags: ['Vue 3', 'FastAPI', 'Analytics'],
  },
  {
    title: 'Enterprise CRM platform migration',
    category: 'CRM & automation',
    tagline: 'Brittle container → reproducible system',
    result: 'Reproducible CRM in one command',
    description:
      'Migrated a brittle deployment into a versioned, reproducible platform on Docker Compose — SSO, auto-provisioned calendar sync, 6-language localization, and one-command operations.',
    tags: ['SuiteCRM 8', 'Docker', 'SSO'],
    href: '/blogs/suitecrm-migration-european-textile-company',
  },
  {
    title: 'White-labelled CRM product',
    category: 'CRM & automation',
    tagline: 'A re-themed CRM the client sells as their own',
    result: 'Sellable, branded product with custom add-ons',
    description:
      'Heavily customized SuiteCRM 8 into a fully white-labelled CRM — a modern Angular UI, re-themed detail/edit and legacy views, plus custom add-on modules and features — delivered as a finished product the client now resells under their own brand.',
    tags: ['SuiteCRM 8', 'Angular', 'White-label'],
  },
  {
    title: 'Marketing → CRM lead sync',
    category: 'CRM & automation',
    tagline: 'Marketing leads land in sales instantly',
    result: 'White-labelled CRM resold by the client',
    description:
      'Automated, real-time lead and contact sync from Mautic into the CRM — no manual CSV imports, no missed follow-ups. The partner now resells a white-labelled CRM with the integration built in.',
    tags: ['Mautic', 'Integration', 'CRM'],
  },
  {
    title: 'Sales workflow automation',
    category: 'CRM & automation',
    tagline: 'Quote → order → invoice',
    result: 'End-to-end sales flow automated',
    description:
      "Automated a US client's quote-to-invoice pipeline so the sales team converts quotes to orders to invoices without manual re-entry. Client review: 5.0.",
    tags: ['CRM', 'Automation'],
  },
]

export const publishedProducts = [
  {
    title: 'AI Dashlet Generator',
    blurb: 'AI module that builds CRM dashboard widgets from plain-English prompts.',
    url: 'https://store.suitecrm.com/addons/ai-dashlet-generator',
  },
  {
    title: 'Business Card Reader',
    blurb: 'Lead-capture tool: business cards → contacts via OCR and QR scanning.',
    url: 'https://store.suitecrm.com/addons/business-card-reader',
  },
]
