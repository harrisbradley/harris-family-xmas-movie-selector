# 🎄 Santa's Christmas Movie Picker

### *A Fun Holiday Movie Roulette and Watchlist Manager*

**Santa's Christmas Movie Picker** is a lighthearted, festive web application designed to help families pick which Christmas movies to watch during the holidays. Users can compile their favorite Christmas movies, persist their list locally, and let Santa randomly select three movies with a visual reveal effect and holiday music!

---

## 🎅 Key Features

- **Personal Movie Watchlist**: Add movies with their title, release year, and a description.
- **Santa's Choice (Random Picker)**: Clicking "Let Santa Pick 3 Movies!" selects three random movies from your list (active once at least 3 movies are added).
- **Interactive Visual Reveal**: Renders the picked movies sequentially with a dramatic reveal effect and playing holiday audio.
- **Local Persistence**: Saves your movie database to the browser's `localStorage` so your list is saved for the next movie night.
- **Festive Animation System**: Falling snowflakes in the background (`reveal.css`/`styles.css`) and festive holiday headers/footers to set the mood.
- **Interactive RevealList Component** (`RevealList.tsx`): A React/TypeScript component designed for the same interactive reveal layout.

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3 (for snow and reveal animations), and JavaScript (ES6).
- **Component**: React + TypeScript (provided in `RevealList.tsx` for integration).
- **Persistence**: Browser `localStorage` (fully client-side, no server database required).
- **Audio**: HTML5 Audio Element streaming holiday tunes.

---

## 🚀 Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/harrisbradley/harris-family-xmas-movie-selector.git
cd harris-family-xmas-movie-selector
```

### 2. Launch Local Server
Since it uses local resources and scripts, you can run it using any simple static file server:
```bash
# Using Python
python3 -m http.server 8080

# Or Node's serve
npx serve -p 8080 .
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

---

## 📜 License
Spread the holiday cheer! Merry Christmas! 🎄
