import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date?: string;
}

const SeriesListItem = ({ id, name, poster_path, first_air_date }: Props) => {
    const navigation = useNavigation<any>();

    const navigateToSeriesDetails = () => navigation.navigate('SerieDetail', { id })

    return (
        <TouchableOpacity className="flex-row items-center gap-4 mb-4" onPress={navigateToSeriesDetails}>
        {poster_path ? (
            <Image source={{ uri: `https://image.tmdb.org/t/p/w185${poster_path}` }} className="w-20 h-28 rounded-md" />
        ) : (
            <View className="w-20 h-28 rounded-md bg-gray-600 justify-center items-center">
            <Text className="text-white text-xs text-center">Image non dispo</Text>
            </View>
        )}
        <View className="flex-1">
            <Text className="text-white text-base font-semibold">{name}</Text>
            {first_air_date && <Text className="text-gray-400 text-sm">Début : {first_air_date}</Text>}
        </View>
        </TouchableOpacity>
    );
};

export default SeriesListItem;
