import fs from "fs"
import yaml from "js-yaml"
import {findWaypoints} from "./waypoints"
import {findTerrain} from "./terrain"
import {findResetZones} from "./resets"
import {findTimingGates} from "./timing-gates"
import {findHayBales} from "./hay-bales"

export interface Stage {
  terrain: ReturnType<typeof findTerrain>
  timingGates: ReturnType<typeof findTimingGates>
  resetZones: ReturnType<typeof findResetZones>
  waypoints: ReturnType<typeof findWaypoints>
  hayBales: ReturnType<typeof findHayBales>
}

export function readStage(path: string): Stage {
  const parsedStage: Record<number, any> = Object.fromEntries(
    fs
      .readFileSync(path, "utf-8")
      .split(/---\s+!u!\d+\s+/)
      .slice(1)
      .map(it => {
        const split = it.indexOf("\n")
        return [Number(it.substring(it.indexOf("&") + 1, split)), yaml.load(it.substring(split))]
      }),
  )

  console.log(
    JSON.stringify(
      [
        ...new Set(
          Object.values(parsedStage)
            .map(it => it["GameObject"]?.m_TagString)
            .filter(it => typeof it === "string")
            .filter(it => !it.startsWith("Waypoint") && !it.startsWith("Terrain") && !it.startsWith("Reset")),
        ),
      ],
      null,
      2,
    ),
  )

  return {
    terrain: findTerrain(parsedStage),
    timingGates: findTimingGates(parsedStage),
    resetZones: findResetZones(parsedStage),
    waypoints: findWaypoints(parsedStage),
    hayBales: findHayBales(parsedStage),
  }
}
