@echo off
setlocal EnableDelayedExpansion
title Xportfolio - Restore Point Utility
color 0B

echo =====================================================================
echo          XPORTFOLIO - INSTANT RESTORE POINT UTILITY
echo =====================================================================
echo  Restore Point: Production Verified Release (2026-09-29)
echo  Git Tag:       v1.0.0-restore-point / restore-point-stable
echo  Git Branch:    restore-point/stable-production-2026-09-29
echo  Local Backup:  C:\D drive\Projects\Xportfolio_Backups
echo =====================================================================
echo.
echo Choose a restoration method:
echo   [1] Restore from Git Tag (Clean hard reset to v1.0.0-restore-point)
echo   [2] Restore from Git Branch (Switch to restore-point branch)
echo   [3] Restore from Local Disk Backup (Copy verified files back)
echo   [4] Run Verification Check (npm run build)
echo   [5] Exit
echo.

set /p choice="Enter option [1-5]: "

if "%choice%"=="1" (
    echo.
    echo [*] Fetching and resetting working tree to tag v1.0.0-restore-point...
    git checkout main
    git reset --hard v1.0.0-restore-point
    echo [✓] Workspace successfully restored to v1.0.0-restore-point!
    pause
    exit /b 0
)

if "%choice%"=="2" (
    echo.
    echo [*] Checking out restore-point/stable-production-2026-09-29 branch...
    git checkout restore-point/stable-production-2026-09-29
    echo [✓] Now on stable restore-point branch!
    pause
    exit /b 0
)

if "%choice%"=="3" (
    echo.
    echo [*] Restoring files from local backup folder...
    set "BACKUP_DIR=C:\D drive\Projects\Xportfolio_Backups\Xportfolio_restore_point_20260929_215253"
    if not exist "%BACKUP_DIR%" (
        echo [!] Error: Local backup folder not found at %BACKUP_DIR%
        pause
        exit /b 1
    )
    xcopy /E /I /Y /Q "%BACKUP_DIR%\*" "%~dp0..\"
    echo [✓] Files restored from local backup successfully!
    pause
    exit /b 0
)

if "%choice%"=="4" (
    echo.
    echo [*] Running TypeScript and Next.js build verification...
    cd /d "%~dp0.."
    cmd /c "npm run build"
    pause
    exit /b 0
)

if "%choice%"=="5" (
    exit /b 0
)

echo [!] Invalid selection.
pause
