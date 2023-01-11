import type {Position} from "./waypoints"

export interface Rotation {
  x: number
  y: number
  z: number
  w: number
}

export interface Scale {
  x: number
  y: number
  z: number
}

export interface TransformedObject {
  name: string
  position: Position
  rotation: Rotation
  scale: Scale
}

export interface TimingGates extends TransformedObject {
  forwardGate: TransformedObject
  reverseGate: TransformedObject
}

export function toTransformedObject(transform: any, stage: Record<number, any>): TransformedObject {
  return {
    name: stage[transform.m_GameObject.fileID]["GameObject"].m_Name,
    position: transform.m_LocalPosition,
    rotation: transform.m_LocalRotation,
    scale: transform.m_LocalScale,
  }
}

export function findTimingGates(stage: Record<number, any>): TimingGates {
  const timingGatesTransform =
    stage[
      Object.values(stage).find(it => it["GameObject"]?.m_Name === "TimingGateSensors")["GameObject"]
        .m_Component[0].component.fileID
    ]["Transform"]

  const timingGates = timingGatesTransform.m_Children.map((it: any) =>
    toTransformedObject(stage[it.fileID]["Transform"], stage),
  )

  return {
    ...toTransformedObject(timingGatesTransform, stage),
    forwardGate: timingGates[0],
    reverseGate: timingGates[1],
  }
}
