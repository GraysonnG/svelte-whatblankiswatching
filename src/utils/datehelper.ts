import type { AnimeInfo } from "../types/kitsuResponse"

export const getAnimeDate = (anime: AnimeInfo) => {
  return new Date(anime.attributes.startDate.replace(/-/g, "/"))
}

export const getUniqueYears = (list: AnimeInfo[]) => {
  return [
    ...new Set(
      list.map((info) => info.animeDate.getFullYear())
    ),
  ].sort((a, b) => {
    if (a > b) return -1
    if (b > a) return 1
    return 0
  });
}