/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { TMDB_API_KEY } from '@env';
import { RouteProp, useRoute } from '@react-navigation/native';

type RouteParams = {
  MovieDetail: { id: number };
};

const MovieDetail = () => {
  const route = useRoute<RouteProp<RouteParams, 'MovieDetail'>>();
  const { id } = route.params;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => {
        console.error("Erreur chargement détails du film :", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={{ padding: 16, backgroundColor: 'green', paddingTop: '40%' }} className='bg-green-700 pt-20'>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={{ height: 300, borderRadius: 10 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{movie.title}</Text>
      <Text>{movie.overview}</Text>
      <Text className='text-red-900'>Film</Text>

    </ScrollView>
  );
};

export default MovieDetail;
