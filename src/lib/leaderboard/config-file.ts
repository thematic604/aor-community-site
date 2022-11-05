import group2 from "../../assets/car-stats/setup/60s_setup.txt?raw"
import group3 from "../../assets/car-stats/setup/70s_setup.txt?raw"
import group4 from "../../assets/car-stats/setup/80s_setup.txt?raw"
import groupA from "../../assets/car-stats/setup/groupa_setup.txt?raw"
import groupB from "../../assets/car-stats/setup/groupb_setup.txt?raw"
import groupS from "../../assets/car-stats/setup/groups_setup.txt?raw"
import dakar from "../../assets/car-stats/setup/bonus_dakar_setup.txt?raw"
import logging from "../../assets/car-stats/setup/bonus_logging_setup.txt?raw"
import piaggio from "../../assets/car-stats/setup/bonus_piaggio_setup.txt?raw"
import vans from "../../assets/car-stats/setup/bonus_vans_setup.txt?raw"

function parseConfigFile(file: string): [string, [string, string][]][] {
  return file
    .split(/^\[/m)
    .filter(it => it !== it.trim())
    .map(group => {
      const [title, ...props] = group.split("\n").filter(it => it !== it.trim())

      return [
        camelCaseToTitleCase(title.replace(/]$/m, "")),
        props
          .map(prop => {
            const [key, value] = prop.split("=")
            return [camelCaseToTitleCase(key), value]
          })
          .filter(([, it]) => !!it) as [string, string][],
      ]
    })
}

function camelCaseToTitleCase(camelCase: string): string {
  return camelCase
    .replace(/-/g, " - ")
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/(^| )./g, match => match.toUpperCase())
    .trim()
}

export const SETUP = [
  ["Group 2", parseConfigFile(group2)],
  ["Group 3", parseConfigFile(group3)],
  ["Group 4", parseConfigFile(group4)],
  ["Group B", parseConfigFile(groupB)],
  ["Group S", parseConfigFile(groupS)],
  ["Group A", parseConfigFile(groupA)],
  ["Dakar", parseConfigFile(dakar)],
  ["Logging", parseConfigFile(logging)],
  ["Triwheeler", parseConfigFile(piaggio)],
  ["Vans", parseConfigFile(vans)],
]
