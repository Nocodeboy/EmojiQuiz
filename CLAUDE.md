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
- `js/game.js` - Game logic, scoring, state management, and progression
- `js/ui.js` - UI management, screen transitions, and visual feedback
- `js/audio.js` - Audio system for sound effects and background music

**Data System:**
- `data/index.js` - Main data aggregator with utility functions
- `data/categories.js` - Game categories configuration
- `data/questions/` - Question data organized by category and difficulty
- `data/achievements.js` - Achievement system definitions
- `data/powerups.js` - Power-up configurations
- `data/settings.js` - Game settings and difficulty configurations

**Internationalization:**
- `data/translations/` - Translation files for multiple languages
- `js/i18n/translations.js` - Translation management system

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

**Data Migration:**
```bash
node scripts/migrateData.js
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
- Follow functional programming patterns when appropriate

**CSS:**
- Use BEM methodology for class naming
- Order properties: positioning > dimensions > margins/padding > typography > visual effects
- Use CSS custom properties for theming

## Game Architecture

**State Management:**
- Game state is managed in the `Game` class
- Player progress saved to localStorage
- Settings persisted across sessions

**Question System:**
- Questions organized by category and difficulty (easy/medium/hard)
- Dynamic question loading based on player level
- Built-in validation and duplicate detection

**Scoring Algorithm:**
- Base points vary by difficulty level
- Time bonus for quick answers
- Streak multipliers for consecutive correct answers
- Level bonuses for progression

**Power-up System:**
- 50:50 - Removes two incorrect answers
- Extra Time - Adds 10 seconds to timer
- Extra Hint - Shows additional emoji clue

## Testing and Validation

Before making changes to game data:
1. Run `validateData.js` to check data integrity
2. Use duplicate detection scripts to avoid content conflicts
3. Test question loading across different categories and difficulties

The validation system checks for:
- Complete question structure (emojis, answer, options)
- Correct answer present in options array
- No duplicate options within questions
- Valid achievement conditions
- Category consistency