@echo off

set tailscale="C:\Program Files\Tailscale\tailscale.exe"
if not exist %tailscale-path% (
    curl -L -o tailscale-setup.exe https://pkgs.tailscale.com/stable/tailscale-setup-latest.exe
    tailscale-setup.exe /quiet
    del tailscale-setup.exe
) else (
    %tailscale% logout
)
::tailscale.exe up --authkey ... --hostname ...

pause
