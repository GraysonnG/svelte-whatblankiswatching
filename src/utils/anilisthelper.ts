export const ANILIST_API = "https://graphql.anilist.co";
export const CACHE_KEY = "anilistdata";

const options = {};

export const getAnimeList = async (): Promise<Response> =>
  await fetch(ANILIST_API, options);
