interface Image {
  tiny: string;
  small: string;
  large: string;
  original: string;
}

export enum Season {
  WINTER = "Winter",
  SUMMER = "Summer",
  FALL = "Fall",
  SPRING = "Spring"
}

export interface AnimeInfo {
  animeDate: Date;
  season: Season;
  attributes: {
    canonicalTitle: string;
    slug: string;
    status: string;
    posterImage: Image;
    startDate: string;
  };
  id;
}

export default interface KitsuResponse {
  data: Array<any>;
  included: Array<AnimeInfo>;
}