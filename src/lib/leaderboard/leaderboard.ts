import {leaderboardFilters} from "./data/filter"

export const LEADERBOARD_BASE_HREF = "https://www.funselektorfun.com/artofrally"

export interface LeaderboardEntry {
  platformUserID: string
  platformUserName: string
  userName: string
  rank: number
  score: number
  scoreDetails: number[]
  replayDataID: number
  replayID: string
  type: string
}

export interface LeaderboardResponse {
  result: number
  leaderboard: LeaderboardEntry[]
}

export function makeUrl({
  area,
  stage,
  direction,
  weather,
  group,
  filter,
  platform,
}: {
  area: string
  stage: number
  direction: string
  group: string
  weather: string
  platform: number
  filter: number
}) {
  const url = `http://188.68.55.50:40471/leaderboard/${area}_Stage_${stage}_${direction}_${weather}_${group}/${filter}/${platform}`

  console.log(url)

  return url
}
