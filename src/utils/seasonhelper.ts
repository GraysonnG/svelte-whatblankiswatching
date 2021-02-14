import { AnimeInfo, Season } from "../types/kitsuResponse"
import { getAnimeDate } from "./datehelper";

export const getAnimeSeason = (anime: AnimeInfo) => {
  switch(getAnimeDate(anime).getMonth()) {
    case 0:
    case 1:
    case 2:
      return Season.WINTER;
    case 3:
    case 4:
    case 5:
      return Season.SPRING;
    case 6:
    case 7:
    case 8:
      return Season.SUMMER;
    default:
      return Season.FALL;
  }
}

export const getUniqueSeasons = (list: AnimeInfo[]) => {
  return [...new Set(list.map(anime => anime.season))]
}