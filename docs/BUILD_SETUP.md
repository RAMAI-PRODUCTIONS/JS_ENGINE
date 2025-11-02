# Build Setup Guide

Quick reference for setting up and building the JS Game Engine project.

## Initial Setup

### 1. Install Node.js Dependencies

```bash
npm install
```

### 2. Add Capacitor Platforms (Optional)

```bash
# For Android
npm run cap:add:android

# For iOS (macOS only)
npm run cap:add:ios
```

## Development

### Start Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build for Production (Web)

```bash
npm run build
```

Output: `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## Android Build

### Prerequisites
- Android Studio installed
- Android SDK (API 22+)
- JDK 17+
- Environment variables set (see ANDROID_BUILD_GUIDE.md)

### Quick Build Commands

```bash
# Development APK
npm run android:build
cd android
./gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk

# Release APK
npm run android:build
cd android
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk

# Release AAB (Play Store)
npm run android:build
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### Open in Android Studio

```bash
npm run android
```

## Project Structure After Setup

```
JS_ENGINE/
├── engine/              # Engine core
│   ├── core/           # Engine, Entity, Scene
│   ├── interfaces/      # All interfaces
│   ├── systems/        # System implementations
│   ├── components/     # Built-in components
│   └── utils/          # Utilities
├── game/               # Your game code
│   ├── scenes/         # Game scenes
│   └── scripts/        # Custom scripts
├── src/                # React app
├── android/            # Android project (after cap add android)
├── ios/                # iOS project (after cap add ios)
└── dist/               # Build output
```

## Troubleshooting

### npm install fails
- Use `cmd /c npm install` on Windows if PowerShell scripts are disabled
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall

### TypeScript errors
- Run `npm run build` to check for errors
- Ensure all imports use correct paths
- Check `tsconfig.json` paths configuration

### Android build fails
- Verify `ANDROID_HOME` environment variable
- Check `android/local.properties` exists
- Run `./gradlew clean` in android directory
- See ANDROID_BUILD_GUIDE.md for detailed troubleshooting

## Next Steps

1. Read [ENGINE_README.md](./ENGINE_README.md) for engine API
2. Read [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md) for Android setup
3. Check `game/scenes/MainScene.ts` for examples
4. Create your game in the `game/` directory

