# JS Game Engine - Red Sphere Demo

A simple React Three Fiber application displaying a red unlit sphere, optimized for GitHub Pages deployment.

## 🎯 Features

- **Red Unlit Sphere** - Simple primitive sphere rendered with Three.js
- **React Three Fiber** - Modern React wrapper for Three.js
- **WebGL Renderer** - Reliable rendering with WebGPU detection (fallback ready)
- **GitHub Pages Ready** - Configured for automatic deployment
- **Cross-Browser Compatible** - Works on Chrome, Firefox, Safari, Edge

## 🚀 Quick Start

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build:web
```

### Deploy to GitHub Pages

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Repository Settings → Pages
   - Source: **GitHub Actions**

3. Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```

## 📦 Project Structure

```
JS_ENGINE/
├── src/
│   ├── App.tsx          # Main React component with RedSphere
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment
├── vite.config.js       # Vite configuration (GitHub Pages base path)
└── package.json         # Dependencies and scripts
```

## 🔧 Configuration

### GitHub Pages Base Path

The base path is automatically configured based on your repository name. Update in `vite.config.js`:

```javascript
base: process.env.VITE_BASE_PATH || '/YOUR_REPO_NAME/'
```

### Renderer

Currently using **WebGL** renderer (most reliable). WebGPU detection is implemented but uses WebGL fallback for stability.

## 🐛 Troubleshooting

### Sphere Not Rendering

1. Check browser console for errors
2. Verify Three.js is loading: `console.log(THREE)` in browser console
3. Ensure camera is positioned correctly (should be at z=5)

### GitHub Pages 404

- Verify base path matches repository name
- Check GitHub Actions workflow completed successfully
- Wait 2-3 minutes after first deployment

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires 18+)

## 📱 Android Export

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Android APK export instructions using Capacitor.

## 🎨 Customization

### Change Sphere Color

Edit `src/App.tsx`:

```tsx
<meshBasicMaterial color="#ff0000" /> // Change hex color
```

### Change Sphere Size

```tsx
<sphereGeometry args={[1, 32, 32]} /> // [radius, widthSegments, heightSegments]
```

### Change Camera Position

```tsx
camera={{ 
  position: [0, 0, 5], // Change z value to move closer/farther
  fov: 75,
}}
```

## 📚 Tech Stack

- **React 18** - UI framework
- **React Three Fiber 8** - React renderer for Three.js
- **Three.js 0.169** - 3D graphics library
- **Vite 5** - Build tool and dev server
- **TypeScript** - Type safety

## 📄 License

MIT

---

**Status**: ✅ Ready for deployment  
**Last Updated**: 2024

