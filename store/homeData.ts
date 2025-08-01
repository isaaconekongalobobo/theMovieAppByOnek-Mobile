import AsyncStorage from "@react-native-async-storage/async-storage";
import Series from "screens/series/series";
import { Movie, Serie } from "types/allType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface HomeDataType {
    popularMovies: Movie[] | [],
    setPopularMovies: (movies: Movie[]) => void,
    popularSeries: Serie[] | [],
    setPopularSeries: (series: Serie[]) => void,
}

export const useHomeData = create<HomeDataType>()(
    persist(
        (set) => ({
            popularMovies: [],
            setPopularMovies: (movies: Movie[]) => set({ popularMovies: movies }),
            popularSeries: [],
            setPopularSeries: (series: Serie[]) => set({ popularSeries: series })
        }),
        {
        name: 'home-page-data',
        storage: createJSONStorage(() => AsyncStorage),
        }
    )
)