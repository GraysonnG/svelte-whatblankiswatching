import type { AnimeInfo } from "../../types/kitsuResponse"

export const filterTitle = (anime: AnimeInfo, text: string) => {
  return anime.attributes.canonicalTitle.toLowerCase()
    .includes(text.toLowerCase())
}

export const filterCurrent = (anime: AnimeInfo, current: boolean) => {
  return !current || (current && anime.attributes.status.toLowerCase()
    .includes("current"))
}

export const filterYear = (anime: AnimeInfo, year: string) => {
  return `${anime.animeDate.getFullYear()}`.includes(year)
}

export const filterSeason = (anime: AnimeInfo, season: string) => {
  return anime.season.toString().includes(season)
}