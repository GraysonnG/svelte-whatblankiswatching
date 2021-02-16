import type { AnimeInfo } from "../types/kitsuResponse";
import { add } from "date-fns";

export const getAnimeDate = (anime: AnimeInfo) => {
  return add(new Date(anime.attributes.startDate.replace(/-/g, "/")), {
    days: 14,
  });
};

export const getUniqueYears = (list: AnimeInfo[]) => {
  return [...new Set(list.map((info) => info.animeDate.getFullYear()))].sort(
    (a, b) => {
      if (a > b) return -1;
      if (b > a) return 1;
      return 0;
    }
  );
};
