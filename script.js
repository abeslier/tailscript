const scriptWindows = `@echo off
set tailscale="C:\\Program Files\\Tailscale\\tailscale.exe"
if not exist %tailscale% (
    curl -L -o tailscale-setup.exe https://pkgs.tailscale.com/stable/tailscale-setup-latest.exe
    tailscale-setup.exe /quiet
    del tailscale-setup.exe
) else (
    %tailscale% logout
)`

const command = "tailscale up"
const commandWindows = "%tailscale% up"
const flags = {
    authkey: "--authkey",
    hostname: "--hostname",
    subnets: "--advertise-routes"
}

const inputs = {
    authkey: document.getElementById("authkeyInput"),
    hostname: document.getElementById("hostnameInput"),
    subnets: document.getElementById("subnetInput")
}


function makeCMD(cmd) {
    for (let key in inputs) {
        if (inputs[key].value) {
            cmd += ` ${flags[key]} ${inputs[key].value.trim()}`
        }
    }
    return cmd
}

function downloadAsFile(content) {
    const blob = new Blob(content);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'tailscript.cmd';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}


document.getElementById("copyButton").onclick = () => {
    navigator.clipboard.writeText(makeCMD(command))
}

document.getElementById("downloadButton").onclick = () => {
    downloadAsFile([scriptWindows, "\n", makeCMD(commandWindows)])
}
