import fs from "node:fs"

const root = new URL("../", import.meta.url)
const artwork = fs.readFileSync(new URL("assets/yuri.svg", root))
const icon = "data:image/svg+xml;base64," + artwork.toString("base64")
const packageFile = new URL("package.json", root)
const packageText = fs.readFileSync(packageFile, "utf8")
const previous = JSON.stringify(JSON.parse(packageText).magpie.icon)
const agentFile = new URL("yuri.agent.js", root)
const agentText = fs.readFileSync(agentFile, "utf8")
const agentIcon = agentText.match(/^  icon: ("[^"\n]*"),$/m)?.[1]
if (!previous || !packageText.includes(previous) || !agentIcon) {
  throw new Error("Expected existing package and Agent icon declarations")
}

fs.writeFileSync(packageFile, packageText.replace(previous, JSON.stringify(icon)))
fs.writeFileSync(agentFile, agentText.replace(agentIcon, JSON.stringify(icon)))
