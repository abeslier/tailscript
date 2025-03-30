@echo off
set COMMAND=curl

call :findCommand

echo The path found is: %command_path%
pause


:findCommand
for /f "delims=" %%i in ('where %COMMAND% 2^>nul') do set command_path=%%i
exit /b
