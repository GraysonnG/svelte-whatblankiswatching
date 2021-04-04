import { isBefore } from "date-fns";
import type { AnilistAnime } from "../types/anilistResponse";
import type { AnimeInfo } from "../types/kitsuResponse";
import { getAnimeDate } from "./datehelper";

export const sortByStartDate = (list: AnilistAnime[]) => {
  return list.sort((a, b) => {
    const aStartDate = getAnimeDate(a);
    const bStartDate = getAnimeDate(b);

    if (isBefore(aStartDate, bStartDate)) return 1;
    if (isBefore(bStartDate, aStartDate)) return -1;
    return 0; // fuck you safari
  });
};

export const sortByTitle = (list: AnilistAnime[]) => {
  return list.sort((a, b) => {
    if (a.title.romaji > b.title.romaji) return 1;
    if (a.title.romaji < b.title.romaji) return -1;
    return 0;
  });
}