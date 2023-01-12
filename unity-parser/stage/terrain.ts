import type {TransformedObject} from "./timing-gates"
import {
  findGameObject,
  findGameObjectTransform,
  findType,
  getGameObjectTransform,
  getTransformChildren,
  getTransformGameObject,
  toTransformedObject,
} from "../util"

export interface Terrain extends TransformedObject {
  // xStart: number
  // zStart: number
}

export function findTerrain(stage: Record<number, any>): TransformedObject<Terrain> {
  const gaiaTransform = findGameObjectTransform("Gaia Environment", stage)
  //  const terrain = findType("Terrain", stage)
  //  const gameObject = getTransformGameObject(terrain, stage)
  //  const transform = getGameObjectTransform(gameObject, stage)
  //
  //  const terrainData = gameObject.m_Component
  //    .map((it: any) => stage[it.component.fileID])
  //    .find((it: any) => it["MonoBehaviour"])["MonoBehaviour"]

  return {
    ...toTransformedObject(gaiaTransform, stage),
    children: getTransformChildren(gaiaTransform, stage).map(it => ({
      ...toTransformedObject(it, stage),
    })),
  }
}
