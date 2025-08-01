/* eslint-disable import/no-unresolved */
import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Movie } from 'types/allType';
import { TMBD_IMG_BASE_URL } from '@env'

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <TouchableOpacity className="w-[140px] mr-3 items-center">
      <Image source={{ uri: TMBD_IMG_BASE_URL + movie.poster_path }} className="w-[140px] h-[210px] rounded-lg" resizeMode="cover"/>
      <Text numberOfLines={1} className="mt-2 text-sm font-semibold text-white text-center">
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};

export default MovieCard;
