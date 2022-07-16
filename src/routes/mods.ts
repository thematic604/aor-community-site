import type {RequestHandler} from "./__types/mods"

export const get: RequestHandler = async () => {
  const posts = import.meta.globEager("./mods/*.svx")

  return {
    status: 200,
    body: {
      posts: Object.entries(posts)
        .map(([key, value]) => ({
          path: key.replace(/\.svx$/, "").replace(/^\./, ""),
          ...value.metadata,
        }))
        // @ts-expect-error date subtraction
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    },
  }
}
