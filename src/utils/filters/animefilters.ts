import type { Filters } from "../../store/animeStore";
import type { AnimeInfo } from "../../types/kitsuResponse";

export const filterTitle = (anime: AnimeInfo, text: string) => {
  return anime.attributes.canonicalTitle
    .toLowerCase()
    .includes(text.toLowerCase());
};

export const filterTitleStartsWith = (anime: AnimeInfo, text: string) => {
  return anime.attributes.canonicalTitle
    .toLowerCase()
    .startsWith(text.toLowerCase());
};

export const filterCurrent = (anime: AnimeInfo, current: boolean) => {
  return (
    !current ||
    (current && anime.attributes.status.toLowerCase().includes("current"))
  );
};

export const filterYear = (anime: AnimeInfo, year: string) => {
  return `${anime.animeDate.getFullYear()}`.includes(year);
};

export const filterSeason = (anime: AnimeInfo, season: string) => {
  return anime.season.toString().includes(season);
};

export const filterList = (list: AnimeInfo[], filters: Filters) => {
  return list
    .filter((info) => filterTitle(info, filters.text))
    .filter((info) => filterCurrent(info, filters.current))
    .filter((info) => filterYear(info, filters.year))
    .filter((info) => filterSeason(info, filters.season));
};
