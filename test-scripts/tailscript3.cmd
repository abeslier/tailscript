@echo off
title tailscript
setlocal enabledelayedexpansion


set "COMMAND=tailscale"
set "TEMP_DIR=.tailscript"
set "INSTALL_FILE=tailscale-setup.exe"
set "DOWNLOAD_URL=https://pkgs.tailscale.com/stable/tailscale-setup-latest.exe"


for /f "delims=" %%i in ('where %COMMAND% 2^>nul') do set command_path=%%i
where %COMMAND% > nul 2>&1
if %errorlevel% equ 0 (
    if defined command_path (
        echo !COMMAND! already installed at !command_path!
        echo disconnecting from !COMMAND!...
        !COMMAND! logout
    ) else goto install
) else goto install
goto run


:install
echo downloading %COMMAND%...
mkdir "%TEMP_DIR%" 2>nul
curl -L --progress-bar -o "%TEMP_DIR%/%INSTALL_FILE%" "%DOWNLOAD_URL%"
echo installing %COMMAND%...
"%TEMP_DIR%/%INSTALL_FILE%" /install /passive /norestart
rmdir /s /q "%TEMP_DIR%"
goto check_install


:check_install
for /f "delims=" %%i in ('where %COMMAND% 2^>nul') do set command_path=%%i
where %COMMAND% > nul 2>&1
if %errorlevel% equ 0 (
    if defined command_path (
        echo !COMMAND! installed at !command_path!
    ) else goto retry
) else goto retry
goto run


:retry
:run
echo connecting to %COMMAND%
"%command_path%" --version
goto end


:end
echo %COMMAND% installed and connected !
pause
