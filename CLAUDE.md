# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses **pnpm** as the package manager (specified in package.json).

### Essential Commands
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm generate` - Generate static site

### Linting
- ESLint is configured via `eslint.config.mjs` using Nuxt's ESLint module
- Run linting through Nuxt's built-in ESLint integration

## Project Architecture

This is a **Nuxt 4** application with the following key characteristics:

### Framework Setup
- **Nuxt 4.x** with Vue 3.5+ and Vue Router 4.5+
- **TypeScript** support with project references to `.nuxt/` generated configs
- **ESLint** integration via `@nuxt/eslint` module
- **Nuxt Icon** module for icon handling
- **@nuxtjs/color-mode** for theme switching

### Project Structure
- `app/app.vue` - Main application entry point with theme system
- `pages/index.vue` - Home page with prompts grid and filtering
- `components/TheHeader.vue` - Navigation header with theme toggle and type filtering
- `components/PromptCard.vue` - Individual prompt card component
- `components/PromptsGrid.vue` - Masonry grid layout for prompt cards
- `components/PromptModal.vue` - Modal for detailed prompt view
- `composables/usePrompts.ts` - Prompts data management composable
- `types/index.ts` - TypeScript type definitions

### Key Configuration
- Compatibility date set to '2025-07-15'
- Devtools enabled for development
- Modules: `@nuxt/eslint`, `@nuxt/icon`, `@nuxtjs/color-mode`
- Global CSS in `assets/css/main.css`

## Development Guidelines

### Nuxt 3 and Vue 3 Considerations
- In this project, any modifications must take into account the specific features and best practices of Nuxt 3 and Vue 3

### Component Development
- 在新建组件时需要充分考虑可复用性，在编写代码时需要使用简洁、高效、以及最合适的写法

### Features Implemented
- **Theme System**: Dark (default), Light, and Blue themes with smooth transitions
- **Responsive Design**: Mobile-first approach with masonry grid layout
- **Prompt Categories**: Text generation, Image generation, Video generation
- **Interactive Cards**: Hover effects and click-to-expand functionality
- **Modal System**: Full-screen prompt details with copy-to-clipboard
- **Type Filtering**: Dynamic content filtering by prompt type

## Development Guidelines

### Nuxt 3 and Vue 3 Considerations
- In this project, any modifications must take into account the specific features and best practices of Nuxt 3 and Vue 3

### Component Development
- 在新建组件时需要充分考虑可复用性，在编写代码时需要使用简洁、高效、以及最合适的写法