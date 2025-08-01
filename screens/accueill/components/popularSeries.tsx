/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import axios from 'axios';
import { useHomeData } from 'store/homeData';
import { TMDB_API_KEY } from '@env';
import LoadingSpinner from 'components/loadingSpinner';
import { Serie } from 'types/allType';
import SerieCard from './serieCard';

const PopularSeries = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: '' });

  const popularSeries = useHomeData((state) => state.popularSeries);
  const setPopularSeries = useHomeData((state) => state.setPopularSeries);

  const fetchSeries = (pageNumber: number) => {
    setError({ error: false, message: '' });

    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${pageNumber}`)
      .then((response) => {
        const newSeries: Serie[] = response.data.results;

        const fetchedTotalPages: number = response.data.total_pages;
        setTotalPages(fetchedTotalPages);

        const existingIds = new Set((popularSeries || []).map((s) => s.id));
        const uniqueNewSeries = newSeries.filter((s) => !existingIds.has(s.id));

        const updatedSeries = pageNumber === 1 ? uniqueNewSeries : [...(popularSeries || []), ...uniqueNewSeries];
        setPopularSeries(updatedSeries);
      })
      .catch((err) => {
        console.log('Erreur lors du chargement des séries : ', err);
        setError({ error: true, message: 'Erreur lors du chargement des séries.' });
      })
      .finally(() => {
        if (pageNumber === 1) {
          setInitialLoading(false);
        }
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchSeries(1);
  }, []);

  const loadMore = () => {
    if (!loadingMore && (totalPages === null || page < totalPages)) {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadingMore(true);
      fetchSeries(nextPage);
    }
  };

  const retryFetch = () => {
    setInitialLoading(true);
    setPage(1);
    fetchSeries(1);
  };

  if (initialLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <LoadingSpinner size={70} />
      </View>
    );
  }

  return (
    <View style={{ left: -20 }} className="w-[120%]">
      {error.error && (
        <View className="mb-4 px-4">
          <Text className="text-red-500 text-center mb-2">{error.message}</Text>
          <Pressable onPress={retryFetch} className="bg-red-600 px-4 py-2 rounded-full self-center">
            <Text className="text-white font-bold">Réessayer</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={popularSeries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SerieCard serie={item} />}
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

export default PopularSeries;
