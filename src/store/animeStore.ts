import { writable } from 'svelte/store';
import type { AnimeInfo } from '../types/kitsuResponse';

export interface Filters {
  text: string;
  year: string;
  season: string;
  current: boolean;
}

export interface AnimeStore {
  list: AnimeInfo[];
  filters: Filters
}

export const animeStore = writable({
  list: [],
  filters: {
    text: "",
    year: "",
    season: "",
    current: false
  }
} as AnimeStore)