import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import YouTube from 'react-native-youtube-iframe';
import axios from 'axios';

interface MovieTrailerProps {
  movieId: number;
}

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

const MovieTrailer = ({ movieId }: MovieTrailerProps) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const playerRef = useRef(null);

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
          setVideoKey(trailers[0].key);
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

  if (!videoKey) {
    return (
      <Text className="text-center text-base text-neutral-600 mt-4">
        Aucune bande-annonce trouvée.
      </Text>
    );
  }

  return (
    <View className="w-full aspect-video my-4 rounded-xl overflow-hidden">
      <YouTube
        ref={playerRef}
        videoId={videoKey}
        height={220}
        play={false}
        webViewProps={{
          allowsFullscreenVideo: true,
        }}
      />
    </View>
  );
};

export default MovieTrailer;
