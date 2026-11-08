@echo off
title IIIT Bhubaneswar MessMate Server
echo =====================================================================
echo    IIIT BHUBANESWAR - MESSMATE (SMART DINING PORTAL)
echo =====================================================================
echo.
echo Launching MessMate Web Application in your default browser...
echo Location: %~dp0index.html
echo.
start "" "%~dp0index.html"
echo Application launched! You can interact with all student, manager,
echo and warden features directly in your browser.
echo.
pause
