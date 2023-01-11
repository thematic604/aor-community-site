export interface Position {
  x: number
  y: number
  z: number
}

export function findWaypoints(stage: Record<number, any>): Position[] {
  return Object.values(stage)
    .filter(
      it => typeof it["GameObject"]?.m_Name === "string" && it["GameObject"].m_Name.startsWith("Waypoint"),
    )
    .map(it => {
      const transform = stage[it["GameObject"].m_Component[0].component.fileID]["Transform"]
      return [transform.m_LocalPosition, transform.m_RootOrder]
    })
    .sort(([, a], [, b]) => a - b)
    .map(([it]) => it)
}
