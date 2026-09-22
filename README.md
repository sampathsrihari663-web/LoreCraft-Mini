# LoreCraft — Multi-Language RPG Campaign Syllabus

LoreCraft is a gamified RPG learning platform that transforms programming languages into a fantasy campaign map with AI-evaluated chamber trials. Built in pure, vanilla JavaScript, HTML, and CSS — zero frameworks, bundlers, or build steps.

---

## 🌟 Highlights
- **6 Campaign Realms**: Python, C#, C++, HTML, CSS, JavaScript (92 chambers in total).
- **3 Tiers per Realm**: Foundations → Core → Advanced.
- **Scroll of Knowledge**: Each chamber teaches the core principles, syntax rules, and runic code examples before the trial begins.
- **AI Arbiter Evaluation (Groq API)**: Analyzes open-ended answers across 2–3 questions, awarding wax-seal grades (S, A, B, C, D) alongside actionable suggestions and corrections.
- **Pure LocalStorage Persistence**: All chamber completions and unlocked tiers persist indefinitely in browser `localStorage`.
- **Zero-Build Deployment**: 100% static files ready for instant hosting on Netlify, GitHub Pages, Vercel, or any web server.

---

## 📁 Repository Structure

```
project-root/
├── index.html                # Gateway redirect to views/index.html
├── netlify.toml              # Netlify build and redirect configuration
├── _redirects                # Netlify edge redirects
├── .gitignore                # Git ignore rules
├── views/
│   ├── index.html            # Campaign map — winding trail of topic nodes
│   └── combat.html           # Chamber trial — Scroll of Knowledge + Arbiter evaluation
├── css/
│   └── style.css             # Dungeon & parchment design tokens, layout, and responsive styles
├── js/
│   ├── main.js               # Campaign map DOM controller & trail navigation
│   ├── combat.js             # Chamber DOM controller & AI evaluation display
│   ├── utils.js              # DOM query shortcuts, URL param helpers
│   └── service/
│       ├── topicService.js   # Syllabus data, localStorage persistence & tier progression
│       ├── groqService.js    # Groq API evaluator (openai/gpt-oss-120b)
│       └── lessonDatabase.js # Manuscripts, rules & questions across 6 languages
├── exception/
│   ├── apiException.js       # User-friendly error wrappers
│   └── validationException.js# Multi-answer input validation
├── questions_and_answers.txt # Complete offline study syllabus with model answers
└── README.md
```

---

## 🚀 Deploying to Netlify

LoreCraft is completely pre-configured for Netlify:

### Method 1: Git-Connected Deploy (Recommended)
1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log into [Netlify](https://app.netlify.com).
3. Click **"Add new site"** -> **"Import an existing project"**.
4. Select your repository.
5. Netlify will automatically detect:
   - **Build command**: *(leave blank)*
   - **Publish directory**: `.`
6. Click **Deploy Site** — your site will be live immediately!

### Method 2: Netlify Drop (Manual Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this entire project folder into the upload box.
3. Your campaign will be live in seconds.

---

## 💻 Running Locally

Because the application uses native ES modules (`<script type="module">`), modern browsers require pages to be served over HTTP rather than `file://` to avoid CORS restrictions on local imports.

### Option A: Python (Built-in)
```bash
python3 -m http.server 8000
```
Open: [http://localhost:8000/views/index.html](http://localhost:8000/views/index.html)

### Option B: Node.js (npx serve)
```bash
npx serve .
```

---

## 🛡️ Git Setup & Pushing to GitHub

To initialize Git and push to your remote GitHub repository:

```bash
# 1. Initialize git repository
git init

# 2. Stage all files
git add .

# 3. Create your first commit
git commit -m "feat: complete LoreCraft multi-language RPG campaign with Groq AI and localStorage"

# 4. Set default branch to main
git branch -M main

# 5. Link to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# 6. Push code to GitHub
git push -u origin main
```
