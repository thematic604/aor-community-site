import type {PageServerLoad} from "./$types"

export const load: PageServerLoad = async ({fetch}) => {
  const repos = await fetch(
    "https://api.github.com/search/repositories?q=topic:aor+topic:mod+fork:true",
  ).then(it => it.json())
  console.assert(!repos.incomplete_results, "Incomplete results!")

  const results = await Promise.all(
    repos.items.map(async (repo: any) => {
      const response = await fetch(`https://raw.githubusercontent.com/${repo.full_name}/master/info.json`)
      if (!response.ok) return null
      const info = await response.json()

      return {
        ...repo,
        info,
      }
    }),
  )

  return {items: results.filter(it => it !== null)}
}
