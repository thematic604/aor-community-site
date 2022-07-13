import carsRaw from "./cars.json"

const carTranslate: Record<string, string> = {
  GROUP_2: "60s",
  GROUP_3: "70s",
  GROUP_4: "80s",
  GROUP_B: "GroupB",
  GROUP_S: "GroupS",
  GROUP_A: "GroupA",
  BONUS_VANS: "Bonus_Vans",
  BONUS_PIAGGIO: "Bonus_Monkey",
  BONUS_DAKAR: "Bonus_Dakar",
  BONUS_LOGGING: "Bonus_Logging",
}

export const cars = carsRaw.reduce<Record<string, typeof carsRaw>>((acc, car) => {
  const className = carTranslate[car.carClass]
  acc[className] = acc[className] || []
  acc[className].push(car)
  return acc
}, {})

export function getCarById(group: string, id: number) {
  return cars[group][id]
}
