import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess"
import seqPreprocessor from "svelte-sequential-preprocessor"
import {mdsvex} from "mdsvex"
import {preprocessThrelte} from "@threlte/preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: seqPreprocessor([
    mdsvex({
      extension: ".svx",
    }),
    preprocess(),
    preprocessThrelte(),
  ]),
  extensions: [".svelte", ".svx"],
  kit: {
    adapter: adapter(),
  },
}

export default config
