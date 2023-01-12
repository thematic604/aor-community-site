import type {TransformedObject} from "./timing-gates"
import {findGameObjectTransformInChildren, getTransformChildren, toTransformedObject} from "../util"

export function findProps(
  parentTransform: any,
  stage: Record<number, any>,
): TransformedObject<TransformedObject> | undefined {
  const transform = findGameObjectTransformInChildren("Props", parentTransform, stage)
  if (!transform) return undefined

  return {
    ...toTransformedObject(transform, stage),
    children: getTransformChildren(transform, stage).map(it => toTransformedObject(it, stage)),
  }
}
