# Electron Desktop Application

This directory contains the Electron main process files for the desktop application.

## Files

- **main.js** - Main Electron process entry point
- **preload.js** - Preload script that bridges renderer and main process securely
- **icon.ico** - Windows application icon (create this file)
- **icon.png** - Linux application icon (create this file)

## Development

Run in development mode:
```bash
npm run electron:dev
```

Make sure the Vite dev server is running (`npm run dev`) in another terminal.

## Building

Build for desktop:
```bash
npm run electron:build:win    # Windows
npm run electron:build:linux  # Linux
```

See [Desktop Build Guide](../docs/DESKTOP_BUILD_GUIDE.md) for complete documentation.

## Icons

You need to create icon files:
- `icon.ico` - Windows icon (256x256 recommended)
- `icon.png` - Linux icon (512x512 recommended)

Use tools like:
- [CloudConvert](https://cloudconvert.com/) - PNG to ICO conversion
- [ImageMagick](https://imagemagick.org/) - Command-line tools
- Online icon generators

## Security

The Electron app uses:
- **Context Isolation**: Enabled (renderer can't access Node.js directly)
- **Node Integration**: Disabled (renderer runs in secure sandbox)
- **Preload Script**: Provides safe API bridge between main and renderer processes

