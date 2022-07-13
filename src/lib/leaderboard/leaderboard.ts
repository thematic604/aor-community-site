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
