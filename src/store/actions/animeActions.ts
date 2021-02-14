import { animeStore } from '../animeStore'
import { add, isBefore } from "date-fns";
import type { CachedItem } from "../../utils/cachehelper";
import { getStoredValue } from "../../utils/cachehelper";
import { getAnimeList, CACHE_KEY } from "../../utils/kitsuhelper";
import type KitsuResponse from "../../types/kitsuResponse"
import { getAnimeDate, getUniqueYears } from '../../utils/datehelper';
import { getAnimeSeason, getUniqueSeasons } from '../../utils/seasonhelper';

interface Stash extends CachedItem {
  data: KitsuResponse;
}

export const init = async () => {
  const animeData = (
    await getStoredValue<Stash>(CACHE_KEY, async () => {
      return {
        data: await getAnimeList().then((res) => res.json()),
        expire: add(new Date(), {
          minutes: 60,
        }),
      };
    })
  ).data;

  animeStore.update((state) => {
    state.list = animeData.included.map(preInfo => ({
      ...preInfo,
      animeDate: getAnimeDate(preInfo),
      season: getAnimeSeason(preInfo)
    }))
    state.years = getUniqueYears(state.list)
    state.seasons = getUniqueSeasons(state.list)
    return state
  });
}

export const sort = async () => {
  animeStore.update(state => {
    state.list.sort((a, b) => {
      const aStartDate = a.animeDate
      const bStartDate = b.animeDate

      if (isBefore(aStartDate, bStartDate)) return 1;
      if (isBefore(bStartDate, aStartDate)) return -1;
      return 0; // fuck you safari
    })
    state.loading = false
    return state
  })

}