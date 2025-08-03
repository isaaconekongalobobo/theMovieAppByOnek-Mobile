/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TMDB_API_KEY } from '@env';
import LoadingSpinner from 'components/loadingSpinner';

interface Props {
  genreId: number;
  genreName: string;
}

const SeriesByGenre = ({ genreId, genreName }: Props) => {
    const [series, setSeries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();
    const navigateToSeriesDetails = (id: any)=> navigation.navigate('SerieDetail', { id })

    useEffect(() => {
        const fetchSeries = async () => {
        try { const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&language=fr-FR&with_genres=${genreId}`);
            const json = await response.json();
            setSeries(json.results.slice(0, 10));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchSeries();
    }, [genreId]);

    if (loading) {
        return <LoadingSpinner size={50} />;
    }

    return (
        <View>
        <Text className="text-white text-lg font-semibold mb-2">{genreName}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3" contentContainerStyle={{ gap: 12 }}>
                {series.map((serie) => (
                <TouchableOpacity key={serie.id}  onPress={() => navigateToSeriesDetails(serie.id)} className="w-28">
                    { serie.poster_path ? <Image source={{ uri: `https://image.tmdb.org/t/p/w185${serie.poster_path}` }} className="w-28 h-40 rounded-md" /> : (
                        <View className="w-28 h-40 bg-gray-600 justify-center items-center rounded-md">
                            <Text className="text-white text-xs text-center">Image non dispo</Text>
                        </View>
                    )}
                    <Text className="text-white text-sm mt-1" numberOfLines={1}> {serie.name}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default SeriesByGenre;
