export const leaderboardPlatforms = [
  {name: "Epic", id: 0},
  {name: "GOG", id: 1},
  {name: "Steam", id: 2},
  {name: "Xbox", id: 3},
  {name: "PlayStation", id: 4},
  {name: "Nintendo", id: 5},
  {name: "None", id: 6},
]

export const platformNameByID = leaderboardPlatforms.reduce<Record<number, string>>((acc, cur) => {
  acc[cur.id] = cur.name
  return acc
}, {})
