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
    romanji: string;
  };
  season: Season;
  seasonYear: Number;
  genres: string[];
  status: string;
  studios: {
    nodes: AnilistStudio[];
  };
  nextAiringEpisode: AnilistNextEpisode | null;
  coverImage: Image;
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
}

interface AnilistNextEpisode {
  airingAt: Number;
  episode: Number;
  timeUntilAiring: Number;
}
