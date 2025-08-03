export interface ErrorMessageType {
    message: string
}

export interface LoadingSpinnerProps {
    size: number
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  created: string | null;
  profilImage: string | null;
};

export interface UserConnectedStore {
  userConnected: User | null
  setUserConnected: (autheticatedUser: User | null) => void
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | Collection; // ou juste null si tu ne gères pas les collections
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Serie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: string | number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  episode_count: number;
  poster_path: string | null;
  season_number: number;
  air_date: string | null;
};

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id?: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for: ActorMovie[];
  biography?: string
  deathday?: string
  birthday?: string
  place_of_birth?: string
}

export interface ActorMovie {
    backdrop_path: string | null;
    id: number;
    title?: string;         // Présent si c'est un film
    name?: string;          // Présent si c'est une série
    original_title?: string;
    original_name?: string;
    media_type: "movie" | "tv";
    poster_path: string | null;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    vote_count: number;
    overview: string;
};



