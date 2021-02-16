import { add, isBefore } from "date-fns";
import type { AnimeInfo } from "../types/kitsuResponse";

export const sortByStartDate = (list: AnimeInfo[]) => {
  return list.sort((a, b) => {
    const aStartDate = a.animeDate;
    const bStartDate = b.animeDate;

    if (isBefore(aStartDate, bStartDate)) return 1;
    if (isBefore(bStartDate, aStartDate)) return -1;
    return 0; // fuck you safari
  });
};

export const sortByTitle = (list: AnimeInfo[]) => {
  return list.sort((a, b) => {
    if (a.attributes.canonicalTitle > b.attributes.canonicalTitle) return 1;
    if (a.attributes.canonicalTitle < b.attributes.canonicalTitle) return -1;
    return 0;
  });
};
