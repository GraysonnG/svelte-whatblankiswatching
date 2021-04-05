import type { AnilistAnime } from "../types/anilist";
import { Season } from "../types/anilist";

export const getSeasonWeight = (season: Season) => {
  switch(season) {
    case Season.WINTER:
      return 0;
    case Season.SPRING:
      return 1;
    case Season.SUMMER:
      return 2;
    case Season.FALL:
      return 3;
  }
}

export const toProperCase = (string: string) => {
  return string.toLowerCase().replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export const getUniqueSeasons = (list: AnilistAnime[]) => {
  return [...new Set(list.map(info => info.season))].sort(
    (a, b) => {
      if (getSeasonWeight(a) > getSeasonWeight(b)) return 1
      if (getSeasonWeight(b) > getSeasonWeight(a)) return -1
      return 0
    }
  )
}