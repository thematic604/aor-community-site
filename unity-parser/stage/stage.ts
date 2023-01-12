import fs from "fs"
import yaml from "js-yaml"
import {findRoadNetwork} from "./road-network"
import {findTerrain} from "./terrain"
import {findResetZones} from "./resets"
import {findTimingGates} from "./timing-gates"
import type {TransformedObject} from "./timing-gates"
import {findProps} from "./props"
import {findGameObjectTransform, findGameObjectTransformInChildren, toTransformedObject} from "../util"

export interface StaticObjects extends TransformedObject {
  terrain: ReturnType<typeof findTerrain>
  props: ReturnType<typeof findProps>
}

export interface DynamicObjects extends TransformedObject {
  resetZones: ReturnType<typeof findResetZones>
  roadNetwork: ReturnType<typeof findRoadNetwork>
  props: ReturnType<typeof findProps>
}

export interface Prefabs extends TransformedObject {
  timingGates: ReturnType<typeof findTimingGates>
}

export interface Stage {
  staticObjects: StaticObjects
  dynamicObjects: DynamicObjects
  prefabs: Prefabs
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

  // console.log(
  //   JSON.stringify(
  //     [
  //       ...new Set(
  //         Object.values(parsedStage)
  //           .map(it => it["GameObject"]?.m_TagString)
  //           .filter(it => typeof it === "string")
  //           .filter(it => !it.startsWith("Waypoint") && !it.startsWith("Terrain") && !it.startsWith("Reset")),
  //       ),
  //     ],
  //     null,
  //     2,
  //   ),
  // )

  const world = findGameObjectTransform("World", parsedStage)
  const staticObjects = findGameObjectTransformInChildren(/Static\s*Objects/, world, parsedStage)
  const dynamicObjects = findGameObjectTransformInChildren(/Dynamic\s*Objects/, world, parsedStage)
  const prefabs = findGameObjectTransform(/(Scene\s*)?[Pp]refabs/, parsedStage)
  return {
    staticObjects: {
      ...toTransformedObject(staticObjects, parsedStage),
      terrain: findTerrain(parsedStage),
      props: findProps(staticObjects, parsedStage),
    },
    dynamicObjects: {
      ...toTransformedObject(dynamicObjects, parsedStage),
      resetZones: findResetZones(parsedStage),
      roadNetwork: findRoadNetwork(parsedStage),
      props: findProps(dynamicObjects, parsedStage),
    },
    prefabs: {
      ...toTransformedObject(prefabs, parsedStage),
      timingGates: findTimingGates(parsedStage),
    },
  }
}
