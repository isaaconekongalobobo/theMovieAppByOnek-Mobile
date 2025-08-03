/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { TMDB_API_KEY } from '@env';
import { Actor } from 'types/allType';
import ActorItem from 'components/actorItem';
import LoadingSpinner from 'components/loadingSpinner';

const Actors = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
        if (search.trim().length > 0) {
            searchActors();
        } else {
            setResults([]);
        }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const searchActors = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(search)}&api_key=${TMDB_API_KEY}&language=fr-FR`);
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
            <View className="px-4 mt-4 flex-row flex-wrap justify-between gap-y-8">
                {results.map((actor: Actor) => (
                    <View key={actor.id} className="w-[48%]">
                        <ActorItem actor={actor} />
                    </View>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="px-4 py-8 gap-3">
                <Text className="text-red-600 text-xl font-semibold">Rechercher un acteur</Text>
                <TextInput className="border border-red-600 rounded-md text-white px-4 py-2" placeholder="Nom de l'acteur..." placeholderTextColor="#ccc" value={search} onChangeText={setSearch}/>
            </View>

            <ScrollView className="pt-4" contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
                {search.trim().length > 0 ? renderSearchResults() : <Text className="text-center text-gray-400">Tapez un nom d’acteur pour démarrer la recherche.</Text>}
            </ScrollView>

            {/* 
            
             Ici, :
             - liste horizontales des acteurs les plus célebres
             - Liste des acteurs par univers
            
            */}
        </SafeAreaView>
    );
};

export default Actors;
