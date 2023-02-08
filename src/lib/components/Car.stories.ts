import type {Meta, StoryObj} from "@storybook/svelte"
import Car from "$lib/components/Car.svelte"
import {cars} from "../leaderboard/data/cars"

export default {
  title: "Cars",
  component: Car,
} satisfies Meta

export const CarStory: StoryObj<Car> = {
  args: {
    car: Object.values(Object.values(cars)[0])[0]
  },
}
