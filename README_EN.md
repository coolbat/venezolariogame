# Venezolario - Venezuelan Slang Word Guessing Game

A fun web game for learning Venezuelan slang.

## 🎯 Features

- **Core Word Guessing Game**: Guess Venezuelan slang based on standard Spanish prompts
- **Smart Hint System**: Provides multi-level hints including first letters, pronunciation, example sentences
- **Dictionary System**: Browse and learn all vocabulary with search and category filtering
- **Card Collection**: Unlock beautiful cultural cards to learn about the cultural background behind words
- **Progress Statistics**: Track learning progress and collection achievements

## 🚀 Tech Stack

- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: CSV files (MVP version)
- **Animations**: CSS animations + Framer Motion

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── game/           # Game page
│   ├── dictionary/     # Dictionary page
│   ├── cards/          # Card collection page
│   └── api/            # API routes
├── components/         # Reusable components
│   ├── game/          # Game-related components
│   ├── dictionary/    # Dictionary-related components
│   └── cards/         # Card-related components
├── data/              # CSV data files
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## 🛠️ Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Play

1. **Start Game**: Enter the word guessing interface
2. **Read Hints**: View standard Spanish vocabulary and meanings
3. **Input Answer**: Guess the corresponding Venezuelan slang
4. **Use Hints**: Use hint features if you need help
5. **Collect Cards**: Unlock corresponding cultural cards after correct answers
6. **Browse Dictionary**: View all learned vocabulary
7. **Collection Achievements**: Check collection progress on the cards page

## 📊 Data Management

Current version uses CSV files for data storage:
- `src/data/words.csv`: Vocabulary data
- `src/data/cards.csv`: Card data

Each word entry includes:
- Standard Spanish and Venezuelan slang
- Pronunciation, meaning, example sentences
- Cultural background description
- Difficulty level and category

## 🎨 Design Style

- Uses Venezuelan flag colors (orange, yellow, red) as main color scheme
- Incorporates Latin American cultural elements and animation effects
- Responsive design, compatible with mobile and desktop

## 🚧 Future Plans

- [ ] User system and progress saving
- [ ] More vocabulary and card content
- [ ] Voice playback functionality
- [ ] Multiplayer battle mode
- [ ] Achievements and leaderboard system

## 📝 License

This project is for learning and research purposes only. 