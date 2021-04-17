import type { Filters } from "../../store/animeStore";
import type { AnilistAnime } from "../../types/anilist";
import { animeStartsWithinTwoWeeks } from "../datehelper";

export const filterTitle = (anime: AnilistAnime, text: string) => {
  if (anime.title.romaji === undefined) {
    return false
  }
  return anime.title.romaji
    .toLowerCase()
    .includes(text.toLowerCase());
};

export const filterStudios = (anime: AnilistAnime, text: string) => {
  return anime.studios.edges.filter(edge => edge.isMain).find(studio => studio.node.name.toLowerCase().includes(text.toLowerCase()))
}

export const filterTitleStartsWith = (anime: AnilistAnime, text: string) => {
  return anime.title.romaji
    .toLowerCase()
    .startsWith(text.toLowerCase());
};

export const filterCurrent = (anime: AnilistAnime, current: boolean) => {
  return (
    !current ||
    (current && (
      anime.status.toLowerCase().includes("releasing") ||
      (
        anime.status.toLowerCase().includes("not_yet_released") &&
        animeStartsWithinTwoWeeks(anime)
      )
    ))
  );
};

export const filterYear = (anime: AnilistAnime, year: string) => {
  return `${anime.seasonYear}`.includes(year);
};

export const filterSeason = (anime: AnilistAnime, season: string) => {
  return anime.season.toString().toLowerCase().includes(season.toLowerCase());
};

export const filterText = (anime: AnilistAnime, text: string) => {
  return filterTitle(anime, text) || filterStudios(anime, text)
}

export const filterList = (list: AnilistAnime[], filters: Filters) => {
  return list
    .filter((anime) => filterText(anime, filters.text))
    .filter((anime) => filterCurrent(anime, filters.current))
    .filter((anime) => filterYear(anime, filters.year))
    .filter((anime) => filterSeason(anime, filters.season));
};
