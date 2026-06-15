<script setup lang="ts">
import { useServiceSeo } from '~/composeables/useServiceSeo'

definePageMeta({ title: 'AI Development' })

const faqs = [
  {
    q: 'What kind of AI software do you build?',
    a: 'Custom AI applications that ship to production: AI agents and chatbots, retrieval-augmented generation (RAG) systems over your own documents and data, LLM-powered workflows and automations, and AI features embedded into existing products and CRMs. The focus is useful, reliable systems with real data paths and guardrails — not demos.'
  },
  {
    q: 'What is RAG and do I need it?',
    a: 'RAG (retrieval-augmented generation) grounds an LLM in your own content — docs, tickets, product data, a knowledge base — so answers are accurate and cite real sources instead of hallucinating. You need it whenever you want an AI assistant that answers from your data rather than generic internet knowledge.'
  },
  {
    q: 'Can you add AI to my existing app or CRM?',
    a: 'Yes. I build full-stack (Vue/Nuxt + Laravel/Python FastAPI) and integrate the AI layer into what you already run — including SuiteCRM and other CRMs. Recent work includes an AI voice-agent management portal built on SuiteCRM and a Vue + FastAPI real-time call-tracking and analytics platform.'
  },
  {
    q: 'How do we start, and how fast can I see something working?',
    a: 'Book a 30-minute build call or email the brief. We scope the highest-value workflow first and I build a working version with real data — typically a usable demo within about two weeks, then we harden it for production.'
  },
  {
    q: 'Which models and tools do you work with?',
    a: 'Provider-flexible: OpenAI, Anthropic, and open-weight models, with vector stores and orchestration chosen to fit your data, budget, and privacy needs. The architecture is built so you are not locked to one vendor.'
  }
]

useServiceSeo({
  path: '/services/ai-development',
  title: 'Custom AI Software Development | RAG, LLM Apps & AI Agents',
  description:
    'Hire an AI engineer to build production AI software: RAG systems, LLM applications, AI agents and chatbots, and AI features for your app or CRM. Real systems that ship — not demos.',
  serviceName: 'Custom AI Software Development',
  serviceType: [
    'Custom AI Software Development',
    'RAG System Development',
    'LLM Application Development',
    'AI Agent & Chatbot Development',
    'AI Automation & Integration'
  ],
  breadcrumbName: 'AI Development',
  faqs
})

const sections = [
  {
    heading: 'AI software that actually ships',
    paragraphs: [
      'Plenty of AI projects stall at the demo stage. I build the version that goes to production — with real data paths, error handling, guardrails, and a UI your users and your team can actually trust. The goal is a measurable outcome: faster support, fewer manual steps, better lead quality, a product feature that converts.',
      'Because I am full-stack, one engineer owns the whole thing: the interface (Vue/Nuxt), the backend and APIs (Laravel, Python/FastAPI), the integrations, and the AI layer on top. You do not have to coordinate three contractors to ship one workflow.'
    ]
  },
  {
    heading: 'What I build',
    bullets: [
      'AI agents and chatbots wired into your tools and workflows',
      'RAG systems that answer from your own documents and data, with sources',
      'LLM-powered automations: drafting, classification, extraction, routing',
      'Multi-step content pipelines with human approval gates, safety auditing, and per-run cost ceilings',
      'AI features embedded into existing products, dashboards, and CRMs',
      'AI-powered CRM automation (SuiteCRM, GoHighLevel) — reporting, lead handling, follow-up',
      'Provider-flexible architecture (OpenAI, Anthropic, open-weight) to avoid lock-in'
    ]
  },
  {
    heading: 'Proof from real AI builds',
    paragraphs: [
      'For a marketing client I built a production AI content pipeline (FastAPI, Vue 3, PostgreSQL, LangChain) that turns campaign-performance data into expert-reviewed, SEO-optimized articles through a multi-step LLM workflow — with human approval gates, subject-matter safety auditing, a provider-agnostic engine (Anthropic/Gemini), per-run cost ceilings, and live keyword metrics. It is a real example of agents and RAG running safely at scale.',
      'Other recent AI work includes an AI voice-agent calling-bot management portal built on SuiteCRM — campaign management where each campaign runs multiple servers with restart and configuration controls, and AI voice agents with per-agent voice generation, call scripts, and noise profiles. I also built a Vue front end with a Python FastAPI backend for a real-time call-tracking and analytics platform showing live campaign and call-flow dashboards. Two AI-powered SuiteCRM add-ons (an AI Dashlet Generator and a Business Card Reader) are published on the SuiteCRM Store.'
    ]
  }
]
</script>

<template>
  <ServiceLanding
    eyebrow="AI engineering"
    h1="Custom AI Software — RAG, LLM Apps & AI Agents"
    lede="I build production AI software that ships: RAG systems over your data, LLM applications, AI agents and chatbots, and AI features embedded into your app or CRM — full-stack, from interface to model."
    :sections="sections"
    :faqs="faqs"
    :related="[
      { to: '/services/suitecrm-development', label: 'SuiteCRM development & customization' },
      { to: '/services/mautic-suitecrm-integration', label: 'Mautic → SuiteCRM integration' },
      { to: '/blogs/ai-engineering-revolution', label: 'Article: the AI engineering revolution' }
    ]"
  />
</template>
