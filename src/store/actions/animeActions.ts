import { animeStore } from "../animeStore";
import { add } from "date-fns";
import type { CachedItem } from "../../utils/cachehelper";
import { getStoredValue } from "../../utils/cachehelper";
import type KitsuResponse from "../../types/kitsuResponse";
import { getUniqueYears } from "../../utils/datehelper";
import { getUniqueSeasons } from "../../utils/seasonhelper";
import { sortByStartDate, sortByTitle } from "../../utils/listsorters";
import { ANILIST_CACHE_KEY, getAnilistAnimeList } from "../../utils/anilisthelper";
import type { AnilistAnime } from "../../types/anilistResponse";

interface Stash extends CachedItem {
  data: KitsuResponse;
}

export interface AniStash extends CachedItem {
  data: AnilistAnime[];
  requestDate: Date;
}

export const init = async () => {
  const anilist = (await getStoredValue<AniStash>(ANILIST_CACHE_KEY, async () => {
    return {
      data: await getAnilistAnimeList(),
      requestDate: new Date(),
      expire: add(new Date(), {
        minutes: 60
      })
    }
  })).data

  animeStore.update((state) => {
    state.anilist = anilist
    state.years = getUniqueYears(anilist)
    state.seasons = getUniqueSeasons(anilist)
    return state;
  })
};

export const sort = async () => {
  animeStore.update((state) => {
    sortByStartDate(state.anilist);
    state.loading = false;
    return state;
  });
};
