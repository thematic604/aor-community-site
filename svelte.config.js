import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess"
import {mdsvex} from "mdsvex"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    mdsvex({
      extension: ".svx",
    }),
    preprocess(),
  ],
  extensions: [".svelte", ".svx"],
  kit: {
    adapter: adapter(),
  },
}

export default config
