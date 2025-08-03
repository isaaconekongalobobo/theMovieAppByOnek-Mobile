import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Season } from 'types/allType';

type Props = {
  season: Season
};

const SeasonItem = ({ season }: Props) => {
    const seasonImageUri = season.poster_path ? `https://image.tmdb.org/t/p/w200${season.poster_path}` : 'https://res.cloudinary.com/do2qnb4zc/image/upload/v1754232799/Post-3_ftvhrg.png'
    return (
        <View className="flex-row gap-4 mb-4">
            <TouchableOpacity className="flex-row gap-4 mb-4">
                <Image source={{ uri: seasonImageUri}} style={{ width: 100, height: 150, borderRadius: 8 }} resizeMode="cover"/>
            </TouchableOpacity>

            <View className="flex-1 justify-between py-1">
                <Text className="text-white font-bold text-lg">{season.name}</Text>
                <Text className="text-blue-200 text-sm">
                {season.episode_count} épisode(s)
                </Text>
                { season.air_date && <Text className="text-gray-400 text-xs italic">Sortie : {season.air_date}</Text>}

                <Text numberOfLines={4} className="text-gray-300 text-sm mt-1">{season.overview ? season.overview : 'Pas de résumé disponible'}</Text>
            </View>
        </View>
    );
};

export default SeasonItem;
