/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import axios from 'axios';
import { TMDB_API_KEY } from '@env';
import { RouteProp, useRoute } from '@react-navigation/native';
import { checkInternetConnecion, paragraphFromText } from 'utils/otherUtils';
import LoadingSpinner from 'components/loadingSpinner';
import { Movie } from 'types/allType';
import GenderItem from './genderItem';

type RouteParams = {
  MovieDetail: { id: number };
};

const MovieDetail = () => {
  const route = useRoute<RouteProp<RouteParams, 'MovieDetail'>>();
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [ isUserConnected, setIsUserConnected ] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });

  // Fonction pour checker la connectivité à internet
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
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`)
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
  
  return (
    <ScrollView  className='bg-black px-6 py-10' contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} >
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} style={{ height: 500, borderRadius: 10 }} resizeMode='cover' />
      
      <View className='gap-5'>
        <View className=''>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginVertical: 10 }} className='text-red-600'>{movie?.title}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            { movie?.genres.map( gender => <GenderItem key={gender.id} genre={gender.name} /> )}
          </ScrollView>
        </View>
          
        <View className='gap-2'>
          <Text className='text-red-600 text-balance font-semibold' style={{ fontSize: 20, opacity: 0.9 }}>Déscription</Text>
          { movie?.overview.length !== 0 ? (
              paragraphFromText(movie?.overview )?.map((paragraph, index) => (
                <Text key={index} style={{ marginBottom: 12, color: 'white', fontSize: 16, opacity: 0.9 }}> {paragraph} </Text>
              ))
            ) : '' 
          }
        </View>        
      </View>
    </ScrollView>
  ); 
};

export default MovieDetail;
