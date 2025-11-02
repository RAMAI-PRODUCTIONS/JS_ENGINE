@echo off
echo ========================================
echo BUILD ALL - WEB + ANDROID APK
echo ========================================
echo.

REM Get script directory and navigate to project root
cd /d %~dp0\..\..\

echo [1/5] Cleaning temporary files...
call npm run clean
if errorlevel 1 (
    echo WARNING: Clean had issues, continuing...
)
echo.

echo [2/5] Building web app (with date/time folder)...
call npm run build
if errorlevel 1 (
    echo ERROR: Web build failed!
    pause
    exit /b 1
)
echo.

echo [3/5] Syncing to Android...
call npx cap sync android
if errorlevel 1 (
    echo ERROR: Android sync failed!
    pause
    exit /b 1
)
echo.

echo [4/5] Building Android APK...
cd android
call gradlew.bat assembleDebug
if errorlevel 1 (
    echo ERROR: APK build failed!
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo [5/5] Locating build outputs...
echo.

echo ========================================
echo BUILD COMPLETE!
echo ========================================
echo.

REM Find latest build folder
for /f "delims=" %%A in ('dir /b /ad /o-n build\2* 2^>nul') do (
    set LATEST_BUILD=%%A
    goto :found
)
:found

if defined LATEST_BUILD (
    echo Web Build: build\%LATEST_BUILD%\dist
    echo.
)

echo APK Location:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo.

REM Get APK file size
for %%A in ("android\app\build\outputs\apk\debug\app-debug.apk") do (
    set APK_SIZE=%%~zA
)
if defined APK_SIZE (
    set /a APK_SIZE_MB=%APK_SIZE% / 1024 / 1024
    echo APK Size: %APK_SIZE_MB% MB
    echo.
)

echo ========================================
echo.
echo To install APK on device:
echo adb install android\app\build\outputs\apk\debug\app-debug.apk
echo.
pause

