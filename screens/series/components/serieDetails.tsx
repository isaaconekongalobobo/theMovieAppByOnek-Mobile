/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, ScrollView, Image, View } from 'react-native';
import axios from 'axios';
import { TMDB_API_KEY } from '@env';
import { RouteProp, useRoute } from '@react-navigation/native';
import { checkInternetConnecion, paragraphFromText } from 'utils/otherUtils';
import LoadingSpinner from 'components/loadingSpinner';

type RouteParams = {
  SerieDetail: { id: number };
};

const SerieDetails = () => {
  const route = useRoute<RouteProp<RouteParams, 'SerieDetail'>>();
  const { id } = route.params;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ isUserConnected, setIsUserConnected ] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });

  const checkInternet = async () => {
    setError({ error: false, message: '' });
    const connectionState = await checkInternetConnecion();
    setIsUserConnected(connectionState);
    if (!connectionState) {
      setError({ error: true, message: "Connectez vous à internet" })
    }
  }

  useEffect(()=> {
    checkInternet();
  }, [])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => {
        console.error("Erreur chargement détails du film :", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Spinner de chargement
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center ">
        <LoadingSpinner size={70} />
      </View>
    );
  }

  // Message d'erreur de connexion
  if (!isUserConnected) {
    return (
      <View className="flex-1 items-center justify-center bg-black h-full ">
        <Text className='text-blue-50 text-lg font-medium'> Connectez vous à internet </Text>
      </View>
    );
  }

  if (!error) {
    return (
      <ScrollView style={{ padding: 16 }}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={{ height: 300, borderRadius: 10 }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{movie.title}</Text>
        <Text>{movie.overview}</Text>
      </ScrollView>
    );    
  }
};

export default SerieDetails;
