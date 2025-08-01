/* eslint-disable import/no-unresolved */
import React from 'react';
import { TMBD_IMG_BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity } from 'react-native';
import { Serie } from 'types/allType';

interface SerieCardProps {
    serie: Serie
}
const SerieCard = ({ serie }: SerieCardProps) => {
    const navigation = useNavigation<any>();
    const navigateToSeriesDetails = ()=> navigation.navigate('SerieDetail', { id: serie.id })
    return (
        <TouchableOpacity className="w-[140px] mr-3 items-center" onPress={navigateToSeriesDetails}>
            <Image source={{ uri: TMBD_IMG_BASE_URL + serie.poster_path }} className="w-[140px] h-[210px] rounded-lg" resizeMode="cover"/>
            <Text numberOfLines={1} className="mt-2 text-sm font-semibold text-white text-center">
                {serie.name}
            </Text>
        </TouchableOpacity>
    );
}

export default SerieCard;
