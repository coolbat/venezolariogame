# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture Overview

Venezolario is a Next.js 15 educational game for learning Venezuelan slang through three main interfaces:

1. **Word Guessing Game** (`/game`) - Players guess Venezuelan slang from Spanish prompts with progressive hints
2. **Dictionary Browser** (`/dictionary`) - Searchable collection of all words with filtering by category
3. **Card Collection** (`/cards`) - Unlockable cultural cards with rarity system (common/rare/epic/legendary)

## Data Management

The application uses CSV files as the data source with API routes for serving:

- **Words**: `src/data/words.csv` → `/api/words` 
- **Cards**: `src/data/cards.csv` → `/api/cards`

Data parsing handled by PapaParse in `src/lib/data.ts`. Each Word contains:
- Standard Spanish and Venezuelan slang terms
- Pronunciation, definition, examples, cultural context
- Category, difficulty level (1-5), linked card ID

## Audio System Architecture

Complex audio system in `src/stores/audioStore.ts` using Zustand with:

- **Dual audio sources**: Static MP3 files with Web Audio API fallbacks
- **Sound types**: click, correct, incorrect, unlock, hint, level_up, card_flip
- **Fallback mechanism**: Auto-generates sounds using `AudioGenerator` if files fail to load
- **Persistent settings**: Volume, enabled states stored in localStorage

## Special Configuration

- **Iframe support** configured in `next.config.js` with `X-Frame-Options: ALLOWALL`
- **CSV webpack loader** for direct CSV imports
- **Path aliases**: `@/*` maps to `src/*`

## Key State Management

- **Audio Store** (Zustand): Sound settings and playback with persistence
- **Local component state**: Game progress, current words, UI interactions
- **No global game state store** - game state managed in individual components

## Component Structure

Components organized by feature:
- `components/game/` - Game mechanics and UI
- `components/dictionary/` - Word browsing and search
- `components/cards/` - Card collection interface  
- `components/audio/` - Audio controls and background music
- `components/ui/` - Shared UI components like SpeechButton

## TypeScript Interfaces

Core types in `src/types/index.ts`:
- `Word` - Complete word data structure
- `Card` - Collectible card with rarity and unlock status
- `GameState` - Current game session state
- `GuessResult` - Game interaction results
- `BlogPost` - Blog article with metadata and content

## Multi-language Support

- Language context in `src/contexts/LanguageContext.tsx` with Spanish/English translations
- Language switcher in navbar (top-right corner)
- Persistent language preference in localStorage

## Blog System

- Markdown-based blog posts in `src/data/blog/`
- Full SEO optimization with structured data
- RSS feed at `/feed.xml`
- Blog API endpoints at `/api/blog`
- Support for frontmatter metadata, categories, tags
- Related posts and social sharing integration