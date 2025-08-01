import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "types/allType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface HomeDataType {
    popularMovies: Movie[] | [],
    setPopularMovies: (movies: Movie[]) => void,
    popularSeries: Serie
}

export const useHomeData = create<HomeDataType>()(
    persist(
        (set) => ({
            popularMovies: [],
            setPopularMovies: (movies: Movie[]) => set({ popularMovies: movies }),
            popularSeries: 
        }),
        {
        name: 'home-page-data',
        storage: createJSONStorage(() => AsyncStorage),
        }
    )
)