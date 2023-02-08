/** @type {import('@storybook/sveltekit').StorybookConfig} */
const config = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.ts"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/sveltekit",
  docs: {
    autodocs: true,
  },
}

export default config
