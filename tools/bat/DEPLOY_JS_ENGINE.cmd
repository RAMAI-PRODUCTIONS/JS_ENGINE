@echo off
echo ========================================
echo DEPLOYING JS_ENGINE TO GITHUB PAGES
echo ========================================
echo.
echo Prerequisites:
echo [✓] GitHub repo created: JS_ENGINE
echo [✓] Remote connected: git remote add origin ...
echo.
pause
echo.

REM Get script directory and navigate to project root
cd /d %~dp0\..\..\

:: Check if remote is set
git remote -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: No Git remote configured!
    echo.
echo Run this first:
echo git remote add origin https://github.com/RAMAI-PRODUCTIONS/JS_ENGINE.git
    pause
    exit /b 1
)

echo [1/5] Checking Git status...
git status
echo.

echo [2/5] Adding all files...
git add .
echo    Files staged!
echo.

echo [3/5] Committing...
git commit -m "Deploy React Three Fiber template to GitHub Pages"
if errorlevel 1 (
    echo    Nothing to commit or already committed!
)
echo.

echo [4/5] Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo.
    echo ERROR: Push failed!
    echo Make sure remote is set correctly.
    pause
    exit /b 1
)
echo    Pushed successfully!
echo.

echo [5/5] GitHub Actions is now running...
echo.
echo ========================================
echo DEPLOYMENT IN PROGRESS!
echo ========================================
echo.
echo What's happening:
echo 1. GitHub Actions is building your React app
echo 2. peaceiris action will CREATE gh-pages branch (automatic!)
echo 3. Built files will be pushed to gh-pages branch
echo.
echo This takes about 2-3 minutes...
echo.
echo Check progress:
echo https://github.com/RAMAI-PRODUCTIONS/JS_ENGINE/actions
echo.
echo ========================================
echo WAIT FOR GREEN CHECKMARK ✓
echo ========================================
echo.
echo After Actions completes (shows green ✓):
echo.
echo STEP 1: Go to Settings
echo https://github.com/RAMAI-PRODUCTIONS/JS_ENGINE/settings/pages
echo.
echo STEP 2: Configure GitHub Pages:
echo   Source: Deploy from a branch
echo   Branch: gh-pages  ← Select this
echo   Folder: / (root)
echo   Click SAVE
echo.
echo STEP 3: Wait 1 minute, then visit:
echo https://RAMAI-PRODUCTIONS.github.io/JS_ENGINE/
echo.
echo ========================================
echo.
echo IMPORTANT: The gh-pages branch is created
echo AUTOMATICALLY by GitHub Actions!
echo You just need to select it in Settings.
echo ========================================
pause

