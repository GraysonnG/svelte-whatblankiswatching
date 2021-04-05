import { writable } from 'svelte/store';
import type { AnilistAnime, Season } from "../types/anilist";

export interface Filters {
  text: string;
  year: string;
  season: string;
  current: boolean;
}

export interface AnimeStore {
  anilist: AnilistAnime[];
  filters: Filters;
  loading: boolean;
  years: number[];
  seasons: Season[];
}

export const animeStore = writable<AnimeStore>({
  loading: true,
  anilist: [],
  filters: {
    text: "",
    year: "",
    season: "",
    current: false
  },
  years: [],
  seasons: []
})