# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a full-stack developer, built with Nuxt 3 (Vue 3), Tailwind CSS + DaisyUI, and GSAP animations.

## Commands

```bash
npm run dev        # Dev server at http://localhost:3000
npm run build      # Production build
npm run preview    # Preview production build
npm run generate   # Static site generation
```

## Architecture

- **Framework:** Nuxt 3 with TypeScript
- **Styling:** Tailwind CSS + DaisyUI with two custom themes (`myDark`, `myLight`) defined in `tailwind.config.ts`
- **Animations:** GSAP with ScrollTrigger, registered as a client-only plugin (`plugins/gsap.client.ts`)
- **Fonts:** Roboto Mono (primary), IBM Plex Mono via Google Fonts module

### Key Patterns

- **Composables** (`composeables/`): Reusable animation logic (`useHeroAnimation`, `useScrollAnimation`) and SEO (`useMetaTags`). Note the directory is intentionally misspelled.
- **Theme system:** Uses Vue's inject/provide pattern. Theme enum values map to DaisyUI theme names in `types/index.ts`.
- **SVG icons:** Tech stack icons are individual Vue components in `components/svg/`.
- **GSAP cleanup:** All GSAP animations must clean up ScrollTrigger instances on component unmount to prevent memory leaks.
- **Icon aliases:** Defined in `app.config.ts` using Nuxt Icon (Iconify).

### Page Structure

Single-page portfolio (`pages/index.vue`) with sections: Hero, Skills, Experience, Education, About. A blog page exists at `pages/blogs/index.vue`. The root `app.vue` wraps everything with Navbar and MatrixRain background effect.
