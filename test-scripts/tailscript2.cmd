@echo off
title tailscript
setlocal enabledelayedexpansion


set "COMMAND_NAME=curl"
set "TEMP_DIR=.tailscript"
set "INSTALL_FILE=tailscale-setup.exe"
set "DOWNLOAD_URL=https://pkgs.tailscale.com/stable/tailscale-setup-latest.exe"

set "ALREADY_INSTALLED_COMMAND=tailscale logout"
set "RUN_COMMAND_FLAGS=--version" &::up --help

set "RUN_MESSAGE=connecting to %COMMAND_NAME%..."
set "END_MESSAGE="


where %COMMAND_NAME% > nul 2>&1
if errorlevel 1 (
    echo %COMMAND_NAME% not found
    call :download
    call :install
    call :check_install
    :: manage failed installation
)
call :run
goto end

:download
echo [1/4] downloading %COMMAND_NAME% installer...
mkdir "%TEMP_DIR%" 2>nul
curl -L --progress-bar -o "%TEMP_DIR%/%INSTALL_FILE%" "%DOWNLOAD_URL%"


:install
echo [2/4] installing %COMMAND_NAME%...
"%TEMP_DIR%/%INSTALL_FILE%" /install /passive /norestart


:check_install
echo [3/4] checking installation...
for /f "delims=" %%i in ('where %COMMAND_NAME% 2^>nul') do set command_path=%%i
where %COMMAND_NAME% > nul 2>&1
if %errorlevel% equ 0 (
    if defined command_path (
        echo !COMMAND_NAME! installed (!command_path!)
        exit /b 0
    )
)
exit /b 1


:run
echo [4/4] %RUN_MESSAGE%
"%command_path%" %RUN_COMMAND_FLAGS%


:end
echo %END_MESSAGE%
pause
