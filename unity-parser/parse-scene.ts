import {readStage} from "./stage/stage"
import type {Stage} from "./stage/stage"
import glob from "glob"
import * as path from "path"
import fs from "fs"
import {Image} from "image-js"
import {Vector3} from "three"

const dumpPath = "E:/Games/aor-dump/artofrally"

const stages = glob.sync(
  path.posix.join(dumpPath.replaceAll(path.sep, path.posix.sep), "Assets/Scene/_Scenes/Stages/**/*.unity"),
)

for (const stage of stages) {
  console.info(path.posix.join(path.basename(path.dirname(stage)), path.basename(stage, ".unity")))

  try {
    const parsedStage = readStage(stage)
    // await processTerrain(parsedStage)

    fs.writeFileSync(
      path.join("static", "stages", `${path.basename(stage, ".unity")}.json`),
      JSON.stringify(parsedStage, null, 2),
    )
  } catch (e) {
    if (!stage.includes("Custom")) {
      console.error(e)
    }
  }
}

async function processTerrain(stage: Stage) {
  for (const terrain of stage.staticObjects.terrain.children) {
    const terrainMap = await Image.load(
      fs.readFileSync(path.join(dumpPath, "Assets", "Terrain", "TerrainData", `${terrain.name}.png`)),
    )
    const heightMap = terrainMap.combineChannels(([r, g, b]: number[]) => {
      return Math.min((r * 3 + g * 2 + b) / 3, 255)
    })
    const normalMap = computeNormalMap(heightMap)
    fs.writeFileSync(
      path.join("static", "stages", "terrain", `${terrain.name}.height.png`),
      heightMap.toBuffer({format: "png"}),
    )
    fs.writeFileSync(
      path.join("static", "stages", "terrain", `${terrain.name}.normal.png`),
      normalMap.toBuffer({format: "png"}),
    )
  }
}

function computeNormalMap(heightMap: Image) {
  const normal = new Image({
    width: heightMap.width,
    height: heightMap.height,
    colorModel: "RGB" as any,
  })
  console.assert(heightMap.channels === 1)
  for (let x = 0; x < heightMap.width; x++) {
    for (let y = 0; y < heightMap.height; y++) {
      const [left] = heightMap.getPixelXY(Math.max(0, x - 1), y)
      const [right] = heightMap.getPixelXY(Math.min(heightMap.width - 1, x + 1), y)

      const [top] = heightMap.getPixelXY(x, Math.max(0, y - 1))
      const [bottom] = heightMap.getPixelXY(x, Math.min(heightMap.height - 1, y + 1))

      normal.setPixelXY(
        x,
        y,
        new Vector3(2 * (right - left), 2 * (bottom - top), -4)
          .normalize()
          .multiplyScalar(127)
          .addScalar(127)
          .toArray(),
      )
    }
  }

  return normal
}
