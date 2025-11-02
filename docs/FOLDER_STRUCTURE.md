# 📁 Project Folder Structure

Complete overview of the organized project structure.

## Root Directory

```
JS_ENGINE/
├── README.md                    # Main project README
├── package.json                 # NPM dependencies
├── vite.config.js              # Vite build config
├── tsconfig.json               # TypeScript config
├── capacitor.config.ts         # Capacitor config
├── index.html                  # Entry HTML
│
├── docs/                       # 📚 Documentation
│   ├── README.md               # Main docs
│   ├── ENGINE_README.md        # Engine API
│   ├── QUICK_START.md          # Quick start guide
│   ├── BUILD_COMMANDS.md       # Build commands
│   ├── BUILD_SYSTEM.md         # Build system docs
│   ├── ANDROID_BUILD_GUIDE.md  # Android guide
│   └── ...                     # Other docs
│
├── tools/                      # 🛠️ Tools & Scripts
│   └── bat/                    # Batch scripts
│       ├── BUILD_ALL.cmd       # Build everything
│       ├── BUILD_QUICK.cmd      # Quick build
│       └── DEPLOY_JS_ENGINE.cmd # GitHub Pages deploy
│
├── scripts/                    # 🔧 JavaScript Build Scripts
│   ├── build.js                # Main build script
│   ├── clean.js                # Cleanup script
│   └── build-utils.js          # Build utilities
│
├── engine/                     # 🎮 Engine Core
│   ├── core/                   # Core classes
│   ├── interfaces/              # All interfaces
│   ├── systems/                 # System implementations
│   ├── components/              # Built-in components
│   └── utils/                   # Utilities
│
├── game/                        # 🎯 Your Game Code
│   ├── scenes/                 # Game scenes
│   └── scripts/                # Custom scripts
│
├── assets/                     # 📦 Game Assets
│   ├── models/                 # 3D models
│   ├── textures/               # Textures
│   ├── audio/                  # Audio files
│   └── shaders/                # Shaders
│
├── src/                        # ⚛️ React Application
│   ├── App.tsx                 # Main app
│   ├── main.jsx                # Entry point
│   └── index.css               # Styles
│
├── build/                      # 📦 Build Outputs
│   ├── .gitkeep                # Git tracking
│   ├── .current-build          # Latest build pointer
│   └── YYYYMMDD-HHMMSS/        # Date/time folders
│       └── dist/               # Web build output
│
├── android/                    # 🤖 Android Project
│   └── app/build/outputs/apk/  # APK files
│
└── node_modules/               # 📚 Dependencies
```

## Folder Descriptions

### 📚 `docs/`
All documentation files. Keep organized by topic:
- Engine documentation
- Build guides
- Setup instructions
- API references

### 🛠️ `tools/`
Build tools and helper scripts:
- `bat/` - Windows batch scripts (.cmd files)
- Easy access via shortcuts

### 🔧 `scripts/`
JavaScript build scripts:
- Node.js scripts for building
- Automated build management
- Cleanup utilities

### 🎮 `engine/`
Engine core - **DO NOT MODIFY** (unless adding engine features):
- Core engine classes
- System implementations
- Interface definitions
- Built-in components

### 🎯 `game/`
Your game code - **MODIFY FREELY**:
- Game-specific scenes
- Custom scripts
- Game logic

### 📦 `assets/`
Game assets:
- Models, textures, audio
- Organized by type

### ⚛️ `src/`
React application entry:
- Main React components
- Entry points

### 📦 `build/`
Build outputs:
- Date/time-stamped folders
- Latest build tracked automatically

## File Organization Rules

1. **Documentation** → `docs/`
2. **Batch Scripts** → `tools/bat/`
3. **JavaScript Scripts** → `scripts/`
4. **Config Files** → Root (standard practice)
5. **Source Code** → Respective folders (`engine/`, `game/`, `src/`)
6. **Assets** → `assets/`

## Accessing Tools

### From Command Line
```cmd
# Build everything
tools\bat\BUILD_ALL.cmd

# Or use npm
npm run build:all
```

### From Anywhere
Batch scripts work from any directory as they use absolute paths.

