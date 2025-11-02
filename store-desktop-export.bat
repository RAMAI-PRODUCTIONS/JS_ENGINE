@echo off
echo ========================================
echo Storing Windows/Linux Desktop Export Work
echo ========================================
echo.

echo Creating feature branch...
git checkout -b feature/windows-linux-desktop-export

echo.
echo Adding all changes...
git add .

echo.
echo Committing changes...
git commit -m "Add Windows and Linux desktop export support via Electron

- Add Electron main process and preload scripts
- Add electron-builder configuration for Windows and Linux
- Add build scripts for desktop platforms
- Add comprehensive desktop build documentation
- Update build system documentation

Note: Windows build has ES module issue that needs fixing.
Will continue development later."

echo.
echo Switching back to dev branch...
git checkout dev

echo.
echo ========================================
echo Done! Desktop export work stored in branch:
echo   feature/windows-linux-desktop-export
echo.
echo To continue later:
echo   git checkout feature/windows-linux-desktop-export
echo ========================================
pause

