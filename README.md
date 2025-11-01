# React Three Fiber Starter Template

A minimal, production-ready starter template for building 3D web experiences with React Three Fiber.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 What's Included

- **React 18** - Modern React with hooks
- **React Three Fiber** - Declarative Three.js in React
- **@react-three/drei** - Useful 3D helpers and abstractions
- **Vite** - Fast build tool with HMR
- **GitHub Actions** - Automatic deployment to GitHub Pages

## 🎨 Features

- ✅ Minimal, clean codebase
- ✅ Hot module replacement (HMR)
- ✅ Responsive 3D canvas
- ✅ TypeScript-ready (optional)
- ✅ Production-optimized build
- ✅ CI/CD with GitHub Actions

## 📁 Project Structure

```
├── .github/workflows/    # GitHub Actions deployment
├── src/
│   ├── App.jsx          # Main React component with 3D canvas
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🛠️ Development

### Start the dev server:
```bash
npm run dev
```
Visit `http://localhost:5173`

### Build for production:
```bash
npm run build
```
Output in `dist/` folder

### Preview production build:
```bash
npm run preview
```

## 🌐 Deployment

### GitHub Pages (Automatic)

Every push to `main` triggers automatic deployment via GitHub Actions.

**Setup:**
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages`
4. Save

Your site will be live at: `https://[username].github.io/[repo]/`

## 📚 Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Three.js Docs](https://threejs.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🎯 Next Steps

1. Edit `src/App.jsx` to add 3D objects
2. Import helpers from `@react-three/drei`
3. Customize styling in `src/index.css`
4. Push to GitHub to deploy

## 📄 License

MIT

---

Built with ❤️ using React + React Three Fiber + Vite
