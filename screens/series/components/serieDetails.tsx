/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import axios from 'axios';
import { TMDB_API_KEY } from '@env';
import { RouteProp, useRoute } from '@react-navigation/native';
import { checkInternetConnecion, paragraphFromText } from 'utils/otherUtils';
import LoadingSpinner from 'components/loadingSpinner';
import ProducerItem from 'components/producerItem';
import GenderItem from 'screens/films/components/genderItem';
import { Genre, ProductionCompany, Season } from 'types/allType';
import SeasonItem from './seasonItem';
import MovieTrailer from 'screens/films/components/movieTrailer';

type RouteParams = {
  SerieDetail: { id: number };
};

const SerieDetails = () => {
  const route = useRoute<RouteProp<RouteParams, 'SerieDetail'>>();
  const { id } = route.params;

  const [serie, setSerie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });

  const checkInternet = async () => {
    setError({ error: false, message: '' });
    const connectionState = await checkInternetConnecion();
    setIsUserConnected(connectionState);
    if (!connectionState) {
      setError({ error: true, message: 'Connectez-vous à internet' });
    }
  };

  useEffect(() => {
    checkInternet();
  }, []);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`)
      .then((res) => setSerie(res.data))
      .catch((err) => {
        console.error("Erreur chargement détails de la série :", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <LoadingSpinner size={70} />
      </View>
    );
  }

  if (!isUserConnected) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-blue-50 text-lg font-medium">Connectez-vous à internet</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-black px-6 py-10" contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${serie?.poster_path}` }} style={{ height: 500, borderRadius: 10 }} resizeMode="cover"/>

      <View className="gap-5">
        <View>
          <Text className="text-red-600" style={{ fontSize: 28, fontWeight: 'bold', marginVertical: 10 }}>
            {serie?.name}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {serie?.genres?.map((genre: Genre) => <GenderItem key={genre.id} genre={genre.name} />)}
          </ScrollView>
        </View>

        {/* Description */}
        <View className="gap-2">
          <Text className="text-red-600 font-semibold" style={{ fontSize: 20 }}>Description</Text>
          {serie?.overview ? (
            paragraphFromText(serie?.overview)?.map((paragraph, index) => (
              <Text key={index} className="text-white" style={{ marginBottom: 12, fontSize: 16, opacity: 0.9 }}>
                {paragraph}
              </Text>
            ))
          ) : <Text className="text-white">Aucune description disponible</Text> }
        </View>

        {/* Saisons */}
        <View className="gap-5">
          <Text className="text-red-600 font-semibold" style={{ fontSize: 20 }}>Saisons</Text>
          <View className="gap-4">
            { serie?.seasons?.map((season: Season) =>  <SeasonItem key={season.id} season={season} />)}
          </View>
        </View>


        {/* Note sur 5 */}
        <View className="gap-2">
          <Text className="text-red-600 font-semibold" style={{ fontSize: 20 }}>Note sur 5</Text>
          <Text className="text-blue-50" style={{ fontSize: 16 }}>
            {[...Array(5)].map((_, i) => (
              <Text key={i}>
                {i < Math.round(serie?.vote_average / 2) ? "⭐" : "☆"}
              </Text>
            ))}
          </Text>
        </View>

        {/* Production */}
        <View className="gap-5">
          <Text className="text-red-600 font-semibold" style={{ fontSize: 20 }}>Production</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {serie?.production_companies?.map((producer: ProductionCompany) => (
              <ProducerItem key={producer.id} producer={producer} />
            ))}
          </ScrollView>
        </View>

        {/* Trailer */}
        <View className="gap-2">
          <Text className="text-blue-50 text-center font-semibold" style={{ fontSize: 30 }}>Le Trailer</Text>
          <MovieTrailer movieId={id} type="tv" />
        </View>
      </View>
    </ScrollView>
  );
};

export default SerieDetails;
