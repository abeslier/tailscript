const scriptWindows = `@echo off
set tailscale="C:\\Program Files\\Tailscale\\tailscale.exe"
if not exist %tailscale% (
    curl -L -o tailscale-setup.exe https://pkgs.tailscale.com/stable/tailscale-setup-latest.exe
    tailscale-setup.exe /quiet
    del tailscale-setup.exe
) else (
    %tailscale% logout
)`;
const scriptWindowsCommand = "%tailscale% up";
const scriptWindowsFilename = "tailscript.cmd";

const command = "tailscale up";
const flags = {
    authkey: "--authkey",
    hostname: "--hostname",
    subnets: "--advertise-routes"
};


const inputs = {
    authkey: document.getElementById("authkeyInput"),
    hostname: document.getElementById("hostnameInput"),
    subnets: document.getElementById("subnetInput")
}
const selectOS = document.getElementById("selectOS")


function makeCMD(cmd) {
    for (let key in inputs) {
        if (inputs[key].value) {
            cmd += ` ${flags[key]} ${inputs[key].value.trim()}`;
            //cmd += ` ${flags[key]}=${inputs[key].value.trim()}`;
        }
    }
    return cmd;
}

function downloadAsFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}


document.getElementById("copyButton").onclick = () => {
    navigator.clipboard.writeText(makeCMD(command));
}

document.getElementById("downloadButton").onclick = () => {
    switch (selectOS.value) {
        case "windows":
            downloadAsFile(`${scriptWindows}\n${makeCMD(scriptWindowsCommand)}`, scriptWindowsFilename);
            break;
        case "debian-bookworm":
            break;
    }
}


/* temporary, until debian script implemented */
function downloadButtonState() {
    if (selectOS.value === "debian-bookworm") {
        document.getElementById("downloadButton").setAttribute('disabled', true);
    } else {
        document.getElementById("downloadButton").removeAttribute('disabled');
    }
}
selectOS.onchange = () => {
    downloadButtonState();
}
window.onload = () => {
    downloadButtonState();
}
