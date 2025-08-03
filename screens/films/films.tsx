/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, ActivityIndicator } from 'react-native';

import { TMDB_API_KEY } from '@env';
import MovieByGenre from 'screens/accueill/components/moviesByGenre';
import MovieListItem from './components/MovieListItem';

const genres = [
  { id: 28, name: 'Action', color: '#E53935' },
  { id: 12, name: 'Aventure', color: '#F57C00' },
  { id: 16, name: 'Animation', color: '#FDD835' },
  { id: 35, name: 'Comédie', color: '#43A047' },
  { id: 80, name: 'Crime', color: '#6D4C41' },
  { id: 99, name: 'Documentaire', color: '#00ACC1' },
  { id: 18, name: 'Drame', color: '#3949AB' },
  { id: 10751, name: 'Famille', color: '#8E24AA' },
  { id: 14, name: 'Fantastique', color: '#5E35B1' },
  { id: 36, name: 'Histoire', color: '#00897B' },
  { id: 27, name: 'Horreur', color: '#C62828' },
  { id: 10402, name: 'Musique', color: '#EC407A' },
  { id: 9648, name: 'Mystère', color: '#7B1FA2' },
  { id: 10749, name: 'Romance', color: '#D81B60' },
  { id: 878, name: 'Science-Fiction', color: '#1E88E5' },
  { id: 10770, name: 'Téléfilm', color: '#546E7A' },
  { id: 53, name: 'Thriller', color: '#FF7043' },
  { id: 10752, name: 'Guerre', color: '#3E2723' },
  { id: 37, name: 'Western', color: '#A1887F' },
];

const Films = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
        if (search.trim().length > 0) {
            searchMovies();
        } else {
            setResults([]);
        }
        }, 500); // Debounce pour ne pas appeler à chaque frappe

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const searchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&api_key=${TMDB_API_KEY}&language=fr-FR`);
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
            <ActivityIndicator size="large" color="#e11d48" />
            </View>
        );
        }

        if (results.length === 0) {
        return  <Text className="text-center text-gray-400 mt-8">Aucun résultat trouvé.</Text>
        }

        return (
        <View className="px-4 mt-4 space-y-4 gap-4">
            { results.map((movie, index) => <MovieListItem key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} release_date={movie.release_date} /> )}
        </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="px-4 py-8 gap-3">
                <Text className="text-red-600 text-xl font-semibold">Rechercher un film</Text>
                <TextInput className="border border-red-600 rounded-md text-white px-4 py-2" placeholder="Titre du film..." placeholderTextColor="#ccc" value={search} onChangeText={setSearch}/>
            </View>

            <ScrollView className="pt-6" contentContainerStyle={{ paddingBottom: 20 }}>
                { search.trim().length > 0 ? renderSearchResults() : (
                    <View className="px-4 space-y-8">
                        { genres.map((genre) => <MovieByGenre key={genre.id} genreId={genre.id} genreName={genre.name}/>)}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Films;
