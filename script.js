const command = "tailscale up"
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

function makeCMD() {
    let cmd = command
    for (let key in inputs) {
        if (inputs[key].value) {
            cmd += ` ${flags[key]} ${inputs[key].value.trim()}`
        }
    }
    return cmd
}

const copyButton = document.getElementById("copyButton")
copyButton.onclick = () => {
    navigator.clipboard.writeText(makeCMD())
}
