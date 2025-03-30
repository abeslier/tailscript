@echo off
title tailscript
setlocal enabledelayedexpansion

set "KEY="

for /f "delims=" %%i in ('where tailscale 2^>nul') do set command_path=%%i
echo tailscale found at %command_path%

echo logging out...
"%command_path%" logout

echo connecting...
tailscale up --authkey 

pause
