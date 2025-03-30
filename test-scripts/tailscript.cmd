@echo off
title tailscript
setlocal enabledelayedexpansion

set "DOWNLOAD_URL=https://pkgs.tailscale.com/stable/tailscale-setup-latest.exe"
set "KEY="

where tailscale > nul 2>&1
if %errorlevel% equ 1 (
    echo [1/3] downloading tailscale
    mkdir .tailscript 2>nul
    curl -L --progress-bar -o .tailscript/tailscale-setup.exe %DOWNLOAD_URL%

    echo [2/3] installing tailscale
    ".tailscript/tailscale-setup.exe" /install /passive /norestart
    rmdir /s /q .tailscript
) else (
    echo [1/3] tailscale already installed
    echo [2/3] logging out
)
echo [3/3] connecting to tailscale
set "tailscale=C:\\Program Files\\Tailscale\\tailscale.exe"
%tailscale% up --authkey %KEY%

echo.
echo j'éspère que ça a fonctionné cette fois
pause
