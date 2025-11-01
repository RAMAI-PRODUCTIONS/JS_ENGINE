# Files to Copy to New GitHub Repository

## ✅ COPY THESE FILES AND FOLDERS:

```
JS_ENGINE/
├── src/                    ← Source code (REQUIRED)
├── .github/                ← GitHub Actions workflow (REQUIRED)
│   └── workflows/
│       └── deploy.yml
├── index.html              ← Root HTML file (REQUIRED)
├── package.json            ← Dependencies (REQUIRED)
├── package-lock.json       ← Lock file (REQUIRED)
├── vite.config.js          ← Build configuration (REQUIRED)
├── .gitignore              ← Git ignore rules (REQUIRED)
├── README.md               ← Documentation (optional but recommended)
├── GITHUB_PAGES_DEPLOY.md  ← Deployment guide (optional)
└── DEPLOY_INSTRUCTIONS.md  ← Instructions (optional)
```

## ❌ DO NOT COPY THESE (They're in .gitignore):

```
❌ node_modules/     ← Will be installed via `npm install`
❌ dist/            ← Built automatically by GitHub Actions
❌ buildfinal/      ← Build artifact
❌ buildfinal.zip   ← Build artifact
❌ metrics/         ← Build metrics
❌ .vite/           ← Vite cache
❌ *.log            ← Log files
```

## Quick Method: Use Git

**If you're already in a git repo locally**, you can use:

```bash
# This will only copy tracked files (excludes .gitignore items)
git add .
git commit -m "Prepare for GitHub Pages"
git push origin main
```

## Manual Copy Method:

If copying manually, copy everything EXCEPT:
- `node_modules/`
- `dist/`
- `buildfinal/`
- `buildfinal.zip`
- `metrics/`

## Minimum Required Files:

At minimum, you MUST have:
1. ✅ `src/` folder
2. ✅ `index.html`
3. ✅ `package.json`
4. ✅ `package-lock.json`
5. ✅ `vite.config.js`
6. ✅ `.github/workflows/deploy.yml`
7. ✅ `.gitignore`

Everything else is optional documentation.

---

**TL;DR:** Copy everything except `node_modules/`, `dist/`, `buildfinal/`, `buildfinal.zip`, and `metrics/`. Or just use `git add .` which automatically excludes what's in `.gitignore`.

