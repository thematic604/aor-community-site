import type {TransformedObject} from "./timing-gates"
import {toTransformedObject} from "./timing-gates"

export function findHayBales(stage: Record<number, any>): TransformedObject[] {
  return Object.values(stage)
    .filter(it => it["GameObject"]?.m_TagString === "Hay_SFX")
    .map(it =>
      toTransformedObject(stage[it["GameObject"].m_Component[0].component.fileID]["Transform"], stage),
    )
    .filter(it => !/^lod/i.test(it.name))
}
