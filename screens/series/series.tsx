/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { TMDB_API_KEY } from '@env';
import SeriesListItem from './components/seriesListItem';
import SeriesByGenre from './components/seriesByGenre';
import LoadingSpinner from 'components/loadingSpinner';

const genres = [
  { id: 10759, name: 'Action & Aventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comédie' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentaire' },
  { id: 18, name: 'Drame' },
  { id: 10751, name: 'Famille' },
  { id: 10762, name: 'Enfants' },
  { id: 9648, name: 'Mystère' },
  { id: 10763, name: 'Actualité' },
  { id: 10764, name: 'Télé-réalité' },
  { id: 10765, name: 'Science-Fiction & Fantastique' },
  { id: 10766, name: 'Feuilleton' },
  { id: 10767, name: 'Talk-show' },
  { id: 10768, name: 'Guerre & Politique' },
  { id: 37, name: 'Western' },
];

const Series = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim().length > 0) {
        searchSeries();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const searchSeries = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(search)}&api_key=${TMDB_API_KEY}&language=fr-FR`);
      const json = await response.json();
      setResults(json.results || []);
    } catch (err) {
      console.error('Erreur de recherche :', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const renderSearchResults = () => {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center mt-8">
          <LoadingSpinner size={50} />
        </View>
      );
    }

    if (results.length === 0) {
      return <Text className="text-center text-gray-400 mt-8">Aucun résultat trouvé.</Text>;
    }

    return (
      <View className="px-4 mt-4 space-y-4 gap-4">
        { results.map((serie) => (
          <SeriesListItem key={serie.id} id={serie.id}  name={serie.name} poster_path={serie.poster_path} first_air_date={serie.first_air_date}/>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 py-8 gap-3">
        <Text className="text-red-600 text-xl font-semibold">Rechercher une série</Text>
        <TextInput className="border border-red-600 rounded-md text-white px-4 py-2" placeholder="Titre de la série..." placeholderTextColor="#ccc" value={search} onChangeText={setSearch}/>
      </View>

      <ScrollView className="pt-6" contentContainerStyle={{ paddingBottom: 80 }}>
        {search.trim().length > 0 ? renderSearchResults() : (
          <View className="px-8 space-y-8 gap-5">
            { genres.map((genre) => <SeriesByGenre key={genre.id} genreId={genre.id} genreName={genre.name} />)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Series;
