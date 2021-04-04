export default interface AnilistResponse {
  data: {
    MediaListCollection: {
      lists: {
        entries: {
          media: AnilistAnime;
        }[];
      }[];
    };
  };
}

export interface AnilistAnime {
  title: {
    romaji: string;
  };
  season: Season;
  seasonYear: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  genres: string[];
  status: string;
  studios: {
    edges: {
      isMain: boolean;
      node: AnilistStudio;
    }[]
    nodes: AnilistStudio[];
  };
  nextAiringEpisode: AnilistNextEpisode | null;
  coverImage: Image;
  episodes: number;
  siteUrl: string;
}

export enum Season {
  WINTER = "Winter",
  SUMMER = "Summer",
  FALL = "Fall",
  SPRING = "Spring",
}

interface Image {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

interface AnilistStudio {
  name: string;
  isAnimationStudio: boolean;
  siteUrl: string;
}

interface AnilistNextEpisode {
  airingAt: number;
  episode: number;
  timeUntilAiring: number;
}
