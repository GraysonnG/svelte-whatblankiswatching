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
  filters: Filters;
  loading: boolean;
}

export const animeStore = writable({
  loading: true,
  list: [],
  filters: {
    text: "",
    year: "",
    season: "",
    current: false
  }
} as AnimeStore)