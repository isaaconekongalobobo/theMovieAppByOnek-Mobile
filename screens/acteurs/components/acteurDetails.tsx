/* eslint-disable import/no-unresolved */
// components/ActorDetails.tsx

import React, { useEffect, useState } from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import axios from 'axios';
import { TMDB_API_KEY } from '@env';
import { RouteProp, useRoute } from '@react-navigation/native';
import { checkInternetConnecion } from 'utils/otherUtils';
import LoadingSpinner from 'components/loadingSpinner';
import { Actor, Movie } from 'types/allType';
import MovieCard from 'screens/accueill/components/movieCard';

type RouteParams = {
  ActorDetails: { id: number };
};

const ActorDetails = () => {
    const route = useRoute<RouteProp<RouteParams, 'ActorDetails'>>();
    const { id } = route.params;
    const [actor, setActor] = useState<Actor>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);

    // Vérifier connexion
    const checkInternet = async () => {
        const connected = await checkInternetConnecion();
        setIsConnected(connected);
    };

    useEffect(() => {
        checkInternet();
    }, []);

    useEffect(() => {
        const fetchActor = async () => {
        try {
            const [details, credits] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`),
                axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${TMDB_API_KEY}&language=fr-FR`)
            ]);
            setActor(details.data);
            setMovies(credits.data.cast);
        } catch (err) {
            console.error("Erreur chargement acteur :", err);
        } finally {
            setLoading(false);
        }
        };

        fetchActor();
    }, [id]);

    if (loading) {
        return (
        <View className="flex-1 items-center justify-center bg-black">
            <LoadingSpinner size={70} />
        </View>
        );
    }

    if (!isConnected) {
        return (
        <View className="flex-1 items-center justify-center bg-black">
            <Text className="text-blue-50 text-lg font-medium">Veuillez vous connecter à Internet</Text>
        </View>
        );
    }

  return (
    <ScrollView className="bg-black p-6" contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${actor?.profile_path}` }} className="w-full h-[500px] rounded-xl mb-5" resizeMode="cover"/>

      <Text className="text-red-600 text-3xl font-bold mb-2">{actor?.name}</Text>

      {/* Informations */}
      <View className="gap-2 mb-5">
        {actor?.biography ? (
          <>
            <Text className="text-red-600 text-xl font-semibold">Biographie</Text>
            <Text className="text-blue-50 text-base leading-6 opacity-90">{actor.biography}</Text>
          </>
        ) : null}

        <Text className="text-red-600 text-xl font-semibold mt-4">Informations</Text>
        <Text className="text-blue-50 text-base opacity-90">Genre : {actor?.gender === 1 ? "Femme" : "Homme"}</Text>
        <Text className="text-blue-50 text-base opacity-90">Date de naissance : {actor?.birthday ?? "Inconnue"}</Text>
        {actor?.deathday && <Text className="text-blue-50 text-base opacity-90">Décès : {actor.deathday}</Text>}
        <Text className="text-blue-50 text-base opacity-90">Lieu de naissance : {actor?.place_of_birth ?? "Non précisé"}</Text>
        <Text className="text-blue-50 text-base opacity-90">Popularité : {actor?.popularity?.toFixed(2)}</Text>
      </View>

      {/* Films de l’acteur */}
      <View className="gap-2">
        <Text className="text-red-600 text-2xl font-semibold mb-2">Films notables</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { movies?.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ActorDetails;
