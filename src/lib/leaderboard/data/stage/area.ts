export interface Stage {
  name: string
  id: number
}

export interface Area {
  name: string
  id: string
  image: string
  stages: Stage[]
}

export const areas: Area[] = [
  {
    name: "Finland",
    id: "Finland",
    image: "finland",
    stages: [
      {name: "noormarkku", id: 1},
      {name: "lamppi", id: 2},
      {name: "palus", id: 3},
      {name: "lassila", id: 4},
      {name: "kairila", id: 5},
      {name: "haapajärvi", id: 6},
    ],
  },
  {
    name: "Sardinia",
    id: "Sardinia",
    image: "sardinia",
    stages: [
      {name: "villacidro", id: 1},
      {name: "san gavino mondreale", id: 2},
      {name: "san benedetto", id: 3},
      {name: "gennamari", id: 4},
      {name: "portu maga", id: 5},
      {name: "montevecchio", id: 6},
    ],
  },
  {
    name: "Japan",
    id: "Japan",
    image: "japan",
    stages: [
      {name: "nasu highland", id: 1},
      {name: "mount asama", id: 2},
      {name: "mount akagi", id: 3},
      {name: "nikko", id: 4},
      {name: "mount haruna", id: 5},
      {name: "haapajärvi", id: 6},
    ],
  },
  {
    name: "Norway",
    id: "Norway",
    image: "norway",
    stages: [
      {name: "laupstad", id: 1},
      {name: "vestpollen", id: 2},
      {name: "stronstad", id: 3},
      {name: "kvannkjosen", id: 4},
      {name: "grunnfor", id: 5},
      {name: "lake rostavatn", id: 6},
    ],
  },
  {
    name: "Germany",
    id: "Germany",
    image: "germany",
    stages: [
      {name: "hockweiler", id: 1},
      {name: "franzenheim", id: 2},
      {name: "holzerath", id: 3},
      {name: "farschweiler", id: 4},
      {name: "mertesdorf", id: 5},
      {name: "gonnesweiler", id: 6},
    ],
  },
  {
    name: "Kenya",
    id: "Kenya",
    image: "kenya",
    stages: [
      {name: "mount kenya", id: 1},
      {name: "karura", id: 2},
      {name: "homa bay", id: 3},
      {name: "ndere island", id: 4},
      {name: "lake baringo", id: 5},
      {name: "lake nakuru", id: 6},
    ],
  },
]
