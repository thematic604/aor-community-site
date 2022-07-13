import type {RequestHandler} from "./__types/[...leaderboardUrl]"
import {LEADERBOARD_BASE_HREF} from "../../lib/leaderboard/leaderboard"

export const get: RequestHandler = async ({params}) => {
  if (params.leaderboardUrl.includes("undefined")) {
    return {
      status: 400,
    }
  }
  const url = `${LEADERBOARD_BASE_HREF}/leaderboard/${params.leaderboardUrl}`

  const response = await fetch(url)
  const body = await response.json()

  return {
    status: response.status,
    body,
  }
}
