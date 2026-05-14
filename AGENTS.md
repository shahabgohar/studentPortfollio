# Repository Guidelines

## Project Structure & Module Organization

This is a Nuxt 3 portfolio application. Page routes live in `pages/`, including `pages/index.vue` and `pages/blogs/index.vue`. Reusable Vue components are in `components/`; SVG icons are under `components/svg/`, and UI primitives are under `components/ui/`. Shared composables are in `composeables/`, utilities in `utils/`, and TypeScript types in `types/` plus `types.ts`. Global styles are in `assets/main.css`. Static files, favicons, images, and 3D models are served from `public/`. Core config lives in `nuxt.config.ts`, `tailwind.config.ts`, and `app.config.ts`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Nuxt dev server, usually at `http://localhost:3000`.
- `npm run build`: create the production build in `.output/`.
- `npm run generate`: generate a static site build when routes support prerendering.
- `npm run preview`: preview the production build locally after `npm run build`.

There is currently no dedicated `lint` or `test` script in `package.json`; use `npm run build` as the minimum validation before submitting changes.

## Coding Style & Naming Conventions

Use Vue single-file components with `<script setup lang="ts">` for new components. Name components in PascalCase, such as `PageSection.vue`. Name composables with the `useX.ts` pattern, such as `useMetaTags.ts`. Keep route files lowercase and directory-based under `pages/`. Prefer TypeScript types, Tailwind utility classes, and existing theme tokens from `tailwind.config.ts`/DaisyUI before adding new colors.

## Testing Guidelines

Automated tests are not configured yet. For UI changes, manually verify desktop and mobile layouts with `npm run dev`, checking navigation, theme toggling, animations, SEO metadata, and route rendering. If tests are added later, place them near the related source or in a `tests/` directory, and add an npm script to run them.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit-style messages, for example `feat(seo): add comprehensive SEO setup` and `feat(variant-e): add ...`. Follow `type(scope): summary`, with common types such as `feat`, `fix`, `docs`, `style`, and `refactor`.

Pull requests should include a short description, validation steps run, linked issue or task when available, and screenshots or screen recordings for visual changes. Note any SEO, analytics, sitemap, or public asset changes explicitly.

## Agent-Specific Instructions

For multi-file tasks or complex features, use ToolSearch to find and invoke Ruflo MCP tools when available. Check system reminders for `[INTELLIGENCE]` pattern suggestions before starting substantial work.
