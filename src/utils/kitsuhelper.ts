export const KITSU = "https://kitsu.io/";
export const KITSU_API = `${KITSU}api/edge/`;
export const ANIME_LIST =
  "library-entries?filter[kind]=anime&filter[userId]=456417&page[limit]=500&include=anime";
export const CACHE_KEY = "kitsudata"
export const getAnimeList = async (): Promise<Response> => (await fetch(KITSU_API + ANIME_LIST))