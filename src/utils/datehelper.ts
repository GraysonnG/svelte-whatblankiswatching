import { add, isBefore } from "date-fns";
import type { AnilistAnime } from "../types/anilist";

export interface Time {
  sec: number;
  min: number;
  hour: number;
  days: number;
}

export const getAnimeDate = (anime: AnilistAnime) => {
  return new Date(
    anime.startDate.year,
    anime.startDate.month - 1,
    anime.startDate.day,
    0, 0, 0, 0
    );
}

export const getUniqueYears = (list: AnilistAnime[]) => {
  return [...new Set(list.map(info => info.seasonYear || info.startDate.year))].sort(
    (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    })
}

export const animeStartsWithinTwoWeeks = (anime: AnilistAnime) => {
  return isBefore(getAnimeDate(anime), add(new Date, { weeks: 2 }))
}

export const createTimeFromSeconds = (seconds: number): Time => {
  const days = ~~(seconds / 86400)
  const hour = ~~((seconds - (86400 * days)) / 3600)
  const min = ~~((seconds - (86400 * days) - (3600 * hour)) / 60)
  const sec = ~~((seconds - (86400 * days) - (3600 * hour) - (60 * min)))

  return {
    sec,
    min,
    hour,
    days
  }
}