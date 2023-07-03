import {configDotenv} from "dotenv";
import * as path from "path";
import {copyFile} from "fs/promises";
import {glob} from "glob";

configDotenv()

const setupDir = path.posix.join(path.posix.resolve(process.env.GAME_DUMP_PATH), 'ExportedProject', 'Assets', 'Resources', 'prefabs', 'carsetups')

for (const file of await glob(path.posix.join(setupDir, '*.txt'))) {
  await copyFile(path.posix.join(setupDir, file), path.join('src', 'assets', 'car-stats', 'setup'))
}
