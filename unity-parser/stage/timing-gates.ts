import type {Position, Rotation, Scale} from "@threlte/core"
import {findGameObjectTransform, getTransformChildren, toTransformedObject} from "../util"

export type TransformedObject<T = void> = Omit<
  {
    name: string
    position: Position
    rotation: Rotation
    scale: Scale
    children: T[]
  },
  T extends object ? "" : "children"
>

export interface TimingGates extends TransformedObject {
  forwardGate: TransformedObject
  reverseGate: TransformedObject
}

export function findTimingGates(stage: Record<number, any>): TimingGates {
  const timingGatesTransform = findGameObjectTransform("TimingGateSensors", stage)

  const timingGates = getTransformChildren(timingGatesTransform, stage).map(it =>
    toTransformedObject(it, stage),
  )

  return {
    ...toTransformedObject(timingGatesTransform, stage),
    forwardGate: timingGates[0],
    reverseGate: timingGates[1],
  }
}
