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


const selectOS = document.getElementById("selectOS")
const inputs = {
    authkey: document.getElementById("authkeyInput"),
    hostname: document.getElementById("hostnameInput"),
    subnets: document.getElementById("subnetInput")
}
const copyButton = document.getElementById("copyButton");
const downloadButton = document.getElementById("downloadButton");


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


copyButton.onclick = () => {
    navigator.clipboard.writeText(makeCMD(command));
}

downloadButton.onclick = () => {
    switch (selectOS.value) {
        case "windows":
            downloadAsFile(`${scriptWindows}\n${makeCMD(scriptWindowsCommand)}`, scriptWindowsFilename);
            break;
        case "debian-bookworm":
            break;
    }
}


/* temporary, until debian script implemented */
function downloadButtonState() {  /* strict equality: including type */
    if (selectOS.value === "debian-bookworm") {
        downloadButton.setAttribute("disabled", "");  /* disabled set to true by specifying any value (e.g. empty string) */
    } else {
        downloadButton.removeAttribute("disabled");
    }
}
selectOS.onchange = () => {
    downloadButtonState();
}
window.onload = () => {
    downloadButtonState();
}
