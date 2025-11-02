@echo off
REM Quick build - clean, build web, build APK
REM Get script directory and navigate to project root
cd /d %~dp0\..\..\
call npm run build:all
pause

