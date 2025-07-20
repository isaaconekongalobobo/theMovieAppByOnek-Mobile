import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "types/allType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface HomeDataType {
    popularMovies: Movie[] | null,
    setPopularMovies: (movies: Movie[]) => void
}

export const useHomeData = create<HomeDataType>()(
    persist(
        (set) => ({
            popularMovies: null,
            setPopularMovies: (movies: Movie[]) => set({ popularMovies: movies })
        }),
        {
        name: 'home-page-data',
        storage: createJSONStorage(() => AsyncStorage),
        }
    )
)