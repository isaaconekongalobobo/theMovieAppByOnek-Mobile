import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

import axios from 'axios';

interface MovieTrailerProps {
  movieId: number;
}

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

const MovieTrailer = ({ movieId }: MovieTrailerProps) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=fr-FR`
        );

        const trailers = res.data.results.filter(
          (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
        );

        if (trailers.length > 0) {
          const embedUrl = `https://www.youtube.com/embed/${trailers[0].key}`;
          setTrailerUrl(embedUrl);
        }
      } catch (error) {
        console.error('Erreur trailer :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#E53935" />;
  }

  if (!trailerUrl) {
    return (
      <Text className="text-center text-base text-neutral-600 mt-4">
        Aucune bande-annonce trouvée.
      </Text>
    );
  }

  return (
    <View className="w-full aspect-video rounded-xl overflow-hidden my-4">
      <WebView className="flex-1" javaScriptEnabled domStorageEnabled source={{ uri: trailerUrl }}/>
    </View>
  );
};

export default MovieTrailer;
