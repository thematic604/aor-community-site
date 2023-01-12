import {findGameObjectTransform, getTransformChildren, toTransformedObject} from "../util"
import type {TransformedObject} from "./timing-gates"

export interface Waypoints extends TransformedObject {
  points: [number, number, number][]
}

export interface RoadNetwork extends TransformedObject {
  waypoints: Waypoints
}

export function findRoadNetwork(stage: Record<number, any>): RoadNetwork {
  const transform = findGameObjectTransform("Road Network", stage)
  const waypointTransform = findGameObjectTransform("Waypoints Parent", stage)

  return {
    ...toTransformedObject(transform, stage),
    waypoints: {
      ...toTransformedObject(waypointTransform, stage),
      points: getTransformChildren(waypointTransform, stage).map(it => [
        it.m_LocalPosition.x,
        it.m_LocalPosition.y,
        it.m_LocalPosition.z,
      ]),
    },
  }
}
