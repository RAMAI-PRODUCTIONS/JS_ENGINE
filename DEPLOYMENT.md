# Deployment Guide

This guide covers deploying the JS Game Engine to GitHub Pages and exporting to Android APK.

## 🚀 GitHub Pages Deployment

### Quick Start

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy red sphere demo"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Source: **GitHub Actions**
   - The workflow will automatically build and deploy

3. **Access your site:**
   - URL: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Automatic Deployment

The `.github/workflows/deploy.yml` workflow automatically:
- Builds the project on every push to `main`
- Deploys to GitHub Pages
- Uses the correct base path for your repository

### Manual Build Test

Test the build locally:
```bash
npm run build:web
npm run preview
```

## 📱 Android APK Export

### Option 1: Capacitor (Recommended)

The project already has Capacitor configured:

```bash
# Build web version
npm run build:web

# Sync with Android
npm run cap:sync

# Open in Android Studio
npm run android

# Or build APK directly
npm run android:apk
```

### Option 2: Using Capacitor CLI

```bash
# Initialize (if not done)
npx cap add android

# Build web
npm run build:web

# Sync
npx cap sync android

# Open Android Studio
npx cap open android

# In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
```

### Option 3: Expo (Alternative)

If you prefer Expo:

```bash
# Install Expo
npm install -g expo-cli

# Initialize Expo project
npx create-expo-app --template

# Copy your React Three Fiber code
# Configure Expo for web support
```

### Option 4: Tauri (Desktop/Mobile)

For Rust-based desktop and mobile apps:

```bash
# Install Tauri CLI
npm install -g @tauri-apps/cli

# Initialize Tauri
npm install --save-dev @tauri-apps/cli
npx tauri init

# Build
npm run tauri build
```

## 🔧 Build Commands

- `npm run dev` - Development server (localhost:5173)
- `npm run build:web` - Build for web (outputs to `dist/`)
- `npm run build` - Custom build with date folders (for Android/iOS)
- `npm run preview` - Preview production build locally
- `npm run android` - Build and open Android Studio
- `npm run android:apk` - Build APK directly

## 📋 Requirements

### For GitHub Pages:
- GitHub account
- Public repository (free GitHub Pages)

### For Android:
- Node.js and npm
- Android Studio
- Java JDK 11+
- Android SDK

## 🐛 Troubleshooting

### GitHub Pages 404 Error
- Check that GitHub Pages source is set to **GitHub Actions** (not branch)
- Verify repository name matches URL path
- Wait 2-3 minutes for first deployment

### Android Build Fails
- Ensure Android Studio and SDK are installed
- Run `npm run cap:sync` after code changes
- Check `capacitor.config.ts` for correct paths

### Assets Not Loading
- Verify base path in `vite.config.js` matches repository name
- Check browser console for 404 errors
- Ensure assets are in `public/` folder or properly imported

## 📚 Additional Resources

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs)

