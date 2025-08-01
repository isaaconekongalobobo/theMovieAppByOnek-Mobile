/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import axios from 'axios';
import { useHomeData } from 'store/homeData';
import { TMDB_API_KEY } from '@env';
import MovieCard from './movieCard';
import LoadingSpinner from 'components/loadingSpinner';
import { Movie } from 'types/allType';

const PopularMovie = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: '' });

  const popularMovies = useHomeData((state) => state.popularMovies);
  const setPopularMovies = useHomeData((state) => state.setPopularMovies);

  const fetchMovies = (pageNumber: number) => {
    setError({ error: false, message: '' });

    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${pageNumber}`)
        .then((response) => {
        const newMovies: Movie[] = response.data.results;

        // Nombre total des données en page récuperé
        const fetchedTotalPages: number = response.data.total_pages;
        setTotalPages(fetchedTotalPages);

        const existingIds = new Set((popularMovies || []).map((m) => m.id));
        const uniqueNewMovies = newMovies.filter((m) => !existingIds.has(m.id));
        
        const updatedMovies = pageNumber === 1 ? uniqueNewMovies : [...(popularMovies || []), ...uniqueNewMovies];
        setPopularMovies(updatedMovies);

        })
      .catch((err) => {
        console.log('Erreur lors du chargement des films : ', err);
        setError({ error: true, message: 'Erreur lors du chargement des films.' });
      })
      .finally(() => {
        if (pageNumber === 1) {
          setInitialLoading(false);
        }
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const loadMore = () => {
    if (!loadingMore && (totalPages === null || page < totalPages)) {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadingMore(true);
      fetchMovies(nextPage);
    }
  };

  const retryFetch = () => {
    setInitialLoading(true);
    setPage(1);
    fetchMovies(1);
  };

  if (initialLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <LoadingSpinner size={70} />
      </View>
    );
  }

  return (
    <View style={{ left: -20 }}>
      {error.error && (
        <View className="mb-4 px-4">
          <Text className="text-red-500 text-center mb-2">{error.message}</Text>
          <Pressable onPress={retryFetch} className="bg-red-600 px-4 py-2 rounded-full self-center">
            <Text className="text-white font-bold">Réessayer</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={popularMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}>
              <LoadingSpinner size={30} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default PopularMovie;
