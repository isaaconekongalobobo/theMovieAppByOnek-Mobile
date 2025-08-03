import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface MovieListItemProps {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
}

const MovieListItem = ({ id, title, poster_path, release_date }: MovieListItemProps) => {
    const navigation = useNavigation<any>();
    const navigateToMovieDetails = () => {
        navigation.navigate('MovieDetail', { id });
    };
    return (
        <TouchableOpacity className="flex-row items-center gap-4 mb-4" onPress={navigateToMovieDetails}>
            { poster_path ?  <Image source={{ uri: `https://image.tmdb.org/t/p/w185${poster_path}` }} className="w-20 h-28 rounded-md"/> : (
                <View className="w-20 h-28 rounded-md bg-gray-600 justify-center items-center">
                    <Text className="text-white text-xs text-center">Image non dispo</Text>
                </View>
            )}
            <View className="flex-1">
                <Text className="text-white text-base font-semibold">{title}</Text>
                { release_date && <Text className="text-gray-400 text-sm">Sortie : {release_date}</Text> }
            </View>
        </TouchableOpacity>
    );
};

export default MovieListItem;
