# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About EmojiQuiz

EmojiQuiz is a retro-styled educational quiz game where players guess concepts, movies, countries, and other topics based on emoji combinations. The game is built as a vanilla HTML/CSS/JavaScript application with a classic video game aesthetic featuring CRT effects.

## Project Structure

The codebase is organized with two main versions in separate directories:
- `EmojiQuiz - v1.0.1/` - Previous version
- `EmojiQuiz - v1.0.2/` - Current version (work in this directory)

### Key Architecture Components

**Core JavaScript Modules:**
- `js/main.js` - Entry point, initializes game and sets up event listeners
- `js/game.js` - Game logic, scoring, state management, achievements, and progression
- `js/ui.js` - UI management, screen transitions, and visual feedback
- `js/audio.js` - Audio system for sound effects and background music
- `js/leaderboard.js` - Online ranking system with Vercel KV integration
- `js/backgrounds.js` - Animated background manager (neon grid, pixel emojis, nebula)

**Data System:**
- `data/index.js` - Main data aggregator with utility functions
- `data/categories.js` - 10 game categories configuration
- `data/questions/` - Question data organized by category and difficulty (10 files, ~450 questions)
- `data/achievements.js` - 20 achievement definitions
- `data/powerups.js` - Power-up configurations (50:50, Extra Time, Extra Hint)
- `data/settings.js` - Game settings and difficulty configurations

**Categories (10 total):**
- movies, countries, history, science, literature, technology (original 6)
- food, music, sports, animals (added in latest update)
- Each category has 15 questions per difficulty (easy/medium/hard) = 45 per category

**Internationalization:**
- `data/translations/` - Translation files for multiple languages
- `js/i18n/translations.js` - Translation management system (ES/EN)

**API:**
- `api/leaderboard/index.js` - Vercel serverless function for ranking (uses @vercel/kv)

## Development Commands

**Data Validation:**
```bash
cd "EmojiQuiz - v1.0.2"
node scripts/validateData.js
```

**Check for Duplicates:**
```bash
node scripts/checkDuplicates.js
node scripts/checkRepeatedEmojis.js
```

**Count Questions:**
```bash
node scripts/countQuestions.js
node scripts/count.js
```

## Coding Standards

**Module System:**
- Uses ES6+ modules with import/export
- Each functionality should be in its own module
- Avoid global variables, use module patterns

**File Naming:**
- JavaScript: camelCase (e.g., `gameLogic.js`)
- CSS: kebab-case (e.g., `game-screen.css`)

**JavaScript Style:**
- Use `const` and `let`, avoid `var`
- Prefer arrow functions and template literals
- Use destructuring for better readability

**CSS:**
- Use BEM methodology for class naming
- Use CSS custom properties for theming

## Game Architecture

**State Management:**
- Game state is managed in the `Game` class
- Player progress saved to localStorage
- Settings persisted across sessions

**Question System:**
- 10 categories with 15 questions per difficulty (easy/medium/hard)
- 450+ total questions validated and deduplicated
- Dynamic question loading based on player level
- Built-in validation and duplicate detection scripts

**Achievement System (20 achievements):**
- Category-specific: one per category (10 total)
- Streak: 3x, 10x combos
- Score milestones: 1000, 5000 points
- Level: reach level 2, level 3
- Master: 5+ correct in every category
- Each achievement has a condition function in `game.js` `checkAchievements()`

**Scoring Algorithm:**
- Base points vary by difficulty (100/150/200)
- Time bonus for quick answers
- Streak multipliers for consecutive correct answers
- Level bonuses for progression

**Ranking System:**
- Online leaderboard via Vercel KV (Redis)
- localStorage fallback when server unavailable
- Requires KV_REST_API_URL and KV_REST_API_TOKEN environment variables in Vercel

## Testing and Validation

Before making changes to game data:
1. Run `validateData.js` to check data integrity
2. Use duplicate detection scripts to avoid content conflicts
3. Verify all answers exist in their options arrays
4. Check that emojis make logical sense for their answers
5. Ensure countries category only has countries (not cities/regions)
