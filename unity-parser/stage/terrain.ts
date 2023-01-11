export interface Terrain {
  name: string
  xStart: number
  zStart: number
}

export function findTerrain(stage: Record<number, any>): Terrain {
  return Object.values(stage)
    .filter(it => it["Terrain"])
    .map(it => {
      const gameObject = stage[it["Terrain"].m_GameObject.fileID]["GameObject"]
      const terrainData = gameObject.m_Component
        .map((it: any) => stage[it.component.fileID])
        .find((it: any) => it["MonoBehaviour"])["MonoBehaviour"]

      return {
        name: gameObject.m_Name,
        xStart: terrainData.xStart,
        zStart: terrainData.zStart,
      }
    })[0]
}
