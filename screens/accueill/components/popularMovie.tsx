import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useHomeData } from 'store/homeData';

const PopularMovie = () => {
    const [ loading, setLoading ] = useState(false)
    const popularMovies = useHomeData((state) => state.popularMovies)
    const setPopularMovies = useHomeData((state) => state.setPopularMovies)

    useEffect(() => {
        if(!popularMovies || popularMovies.length === 0 ) {
            axios.get("")
            .then(() => {
                
            })
        }
    }, [])
    return (
        <View>
            
        </View>
    );
}

export default PopularMovie;
