import {toTransformedObject} from "./timing-gates"
import type {TransformedObject} from "./timing-gates"

export interface ResetZone extends TransformedObject {
  radius: number
}

export function findResetZones(stage: Record<number, any>): ResetZone {
  return Object.values(stage)
    .find(it => it["GameObject"]?.m_Name === "ResetZones")
    ["GameObject"].m_Component.flatMap((it: any) =>
      stage[it.component.fileID]["Transform"].m_Children.map((it: any) => {
        const transform = stage[it.fileID]["Transform"]
        const collider = stage[transform.m_GameObject.fileID]["GameObject"].m_Component
          .map((it: any) => stage[it.component.fileID])
          .find((it: any) => it["SphereCollider"])["SphereCollider"]
        return {...toTransformedObject(transform, stage), radius: collider.m_Radius}
      }),
    )
}
