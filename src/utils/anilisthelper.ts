import { differenceInSeconds } from "date-fns";
import schema from "../gql/animelist.graphql";
import type { AniStash } from "../store/actions/animeActions";
import type AnilistResponse from "../types/anilistResponse";
import type { AnilistAnime } from "../types/anilistResponse";
import { getStoredValue, getStoredValueUnsafe } from "./cachehelper";

const ANILIST_API = "https://graphql.anilist.co";

const getAnilistResponse = async (): Promise<AnilistResponse> => {
  const query = schema.loc.source.body
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {}
    })
  };

  return await fetch(ANILIST_API, options)
    .then(res => res.json());
}

export const getAnilistAnimeList = async (): Promise<AnilistAnime[]> => {
  const response = await getAnilistResponse()

  const outList = []
  response.data.MediaListCollection.lists.forEach(list => {
    list.entries.forEach(entry => {
      outList.push(entry.media)
    })
  })

  return outList
}


export const getSecondsSinceRequestDate = () => {
  const cache = getStoredValueUnsafe<AniStash>(ANILIST_CACHE_KEY)
  return differenceInSeconds(new Date(), new Date(cache.requestDate))
}

export const ANILIST_CACHE_KEY = "anilistdata";