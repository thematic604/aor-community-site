import type {Meta, StoryObj} from "@storybook/svelte"
import Car from "./Car.svelte"

export default {
  title: "Cars",
  component: Car,
} satisfies Meta

export const CarStory = {
  render: args => ({
    component: Car,
    props: args,
  }),
  args: {},
} satisfies StoryObj
