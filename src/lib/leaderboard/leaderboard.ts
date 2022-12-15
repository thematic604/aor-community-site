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

export function makeLeaderboardString({
  area,
  stage,
  direction,
  weather,
  group,
}: {
  area: string
  stage: number
  direction: string
  group: string
  weather: string
}): string {
  return `${area}_Stage_${stage}_${direction}_${weather}_${group}`
}

export function makeUserUrl({
  area,
  stage,
  direction,
  weather,
  group,
  platform,
  userId,
}: {
  area: string
  stage: number
  direction: string
  group: string
  weather: string
  platform: number
  userId: string
}) {
  return `http://188.68.55.50:40471/leaderboard/${makeLeaderboardString({
    area,
    stage,
    direction,
    weather,
    group,
  })}/1/${platform}/${userId}`
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
}): string {
  return `http://188.68.55.50:40471/leaderboard/${makeLeaderboardString({
    area,
    stage,
    direction,
    weather,
    group,
  })}/${filter}/${platform}`
}
