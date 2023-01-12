import type {TransformedObject} from "./stage/timing-gates"
import {Euler, Quaternion} from "three"

export function getGameObjectTransform(gameObject: any, stage: Record<number, any>): any {
  return gameObject ? stage[gameObject.m_Component[0].component.fileID]["Transform"] : undefined
}

export function getTransformGameObject(transform: any, stage: Record<number, any>): any {
  return stage[transform.m_GameObject.fileID]["GameObject"]
}

export function getTransformChildren(transform: any, stage: Record<number, any>): any[] {
  return transform.m_Children.map((it: any) => stage[it.fileID]["Transform"])
}

export function findGameObject(name: string | RegExp, stage: Record<number, any>): any {
  return Object.values(stage).find(it => smartCmp(it["GameObject"]?.m_Name, name))["GameObject"]
}

export function findType(type: string, stage: Record<number, any>): any {
  return Object.values(stage).find(it => it[type])[type]
}

export function findGameObjectTransformInChildren(
  name: string | RegExp,
  parentTransform: any,
  stage: Record<number, any>,
): any {
  return getGameObjectTransform(
    getTransformChildren(parentTransform, stage)
      .map(it => getTransformGameObject(it, stage))
      .find(it => smartCmp(it.m_Name, name)),
    stage,
  )
}

export function findGameObjectTransform(name: string | RegExp, stage: Record<number, any>): any {
  return getGameObjectTransform(findGameObject(name, stage), stage)
}

export function smartCmp(a: string | undefined, b: string | RegExp): boolean {
  return !!a && (typeof b === "string" ? a === b : b.test(a))
}

export function toTransformedObject(transform: any, stage: Record<number, any>): TransformedObject {
  const quaternion = transform.m_LocalRotation
  const euler = new Euler().setFromQuaternion(
    new Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w),
  )
  return {
    name: stage[transform.m_GameObject.fileID]["GameObject"].m_Name,
    position: transform.m_LocalPosition,
    rotation: {
      x: euler.x,
      y: euler.y,
      z: euler.z,
    },
    scale: transform.m_LocalScale,
  }
}
