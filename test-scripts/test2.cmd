@echo off
title test2
setlocal enabledelayedexpansion

for /f "delims=" %%i in ('where tailscale 2^>nul') do set command_path=%%i
echo "%command_path%"
"%command_path%" --version

pause
