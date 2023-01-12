import type {TransformedObject} from "./timing-gates"
import {
  findGameObjectTransform,
  getTransformChildren,
  getTransformGameObject,
  toTransformedObject,
} from "../util"

export interface ResetZone extends TransformedObject {
  radius: number
}

export function findResetZones(stage: Record<number, any>): TransformedObject<ResetZone> {
  const transform = findGameObjectTransform("ResetZones", stage)

  return {
    ...toTransformedObject(transform, stage),
    children: getTransformChildren(transform, stage).map(it => {
      const collider = getTransformGameObject(it, stage)
        .m_Component.map((it: any) => stage[it.component.fileID])
        .find((it: any) => it["SphereCollider"])["SphereCollider"]
      return {...toTransformedObject(it, stage), radius: collider.m_Radius}
    }),
  }
}
