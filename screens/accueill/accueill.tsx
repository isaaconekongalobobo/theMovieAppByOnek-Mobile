import React from 'react';
import { Image, ScrollView, Text, View} from 'react-native';
import PopularMovie from './components/popularMovie';
import PopularSeries from './components/popularSeries';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieByGenre from './components/moviesByGenre';

const genres = [
  // Films
  { id: 28, name: 'Action', color: '#E53935' },
  { id: 12, name: 'Aventure', color: '#F57C00' },
  { id: 16, name: 'Animation', color: '#FDD835' },
  { id: 35, name: 'Comédie', color: '#43A047' },
  { id: 80, name: 'Crime', color: '#6D4C41' },
  { id: 99, name: 'Documentaire', color: '#00ACC1' },
  { id: 18, name: 'Drame', color: '#3949AB' },
  { id: 10751, name: 'Famille', color: '#8E24AA' },
  { id: 14, name: 'Fantastique', color: '#5E35B1' },
  { id: 36, name: 'Histoire', color: '#00897B' },
  { id: 27, name: 'Horreur', color: '#C62828' },
  { id: 10402, name: 'Musique', color: '#EC407A' },
  { id: 9648, name: 'Mystère', color: '#7B1FA2' },
  { id: 10749, name: 'Romance', color: '#D81B60' },
  { id: 878, name: 'Science-Fiction', color: '#1E88E5' },
  { id: 10770, name: 'Téléfilm', color: '#546E7A' },
  { id: 53, name: 'Thriller', color: '#FF7043' },
  { id: 10752, name: 'Guerre', color: '#3E2723' },
  { id: 37, name: 'Western', color: '#A1887F' },

  // Séries
//   { id: 10759, name: 'Action & Adventure', color: '#EF6C00' },
//   { id: 10762, name: 'Kids', color: '#00BFA5' },
//   { id: 10763, name: 'News', color: '#455A64' },
//   { id: 10764, name: 'Reality', color: '#8D6E63' },
//   { id: 10765, name: 'Science-Fiction / Fantastique', color: '#4A148C' },
//   { id: 10766, name: 'Soap', color: '#F06292' },
//   { id: 10767, name: 'Talk-show', color: '#9E9E9E' },
//   { id: 10768, name: 'Guerre & Politique', color: '#3F51B5' },
];



const Accueill = () => {
    return (
        <SafeAreaView className='h-full bg-black' style={{ paddingHorizontal: 0 }} >
            <ScrollView className='gap-14 pt-10 space-y-16' contentContainerStyle={{ paddingBottom: 100 }}>
                <View className='items-center gap-3'>
                    <Image source={require('../../assets/avatar-cover.jpg')}  className="w-[90%] h-44 rounded-2xl" resizeMode="cover" />
                    <Text className='text-red-600 text-[1.5rem] font-semibold text-left '>Votre plaisir commence ici</Text>
                    <Text className='text-white px-10 text-center' style={{ opacity: 0.9 }}>Plongez dans l’univers vibrant du cinéma : les meilleurs films et séries du moment vous attendent pour une aventure sensorielle inoubliable.</Text>                    
                </View>
                <View className='mt-8 px-8 gap-6'>
                    <Text className='text-red-500 text-xl font-medium ' style={{ opacity: 0.9 }}>🎬  Films populaires</Text>
                    <PopularMovie/>
                </View>
                <View className='mt-8 px-8 gap-6'>
                    <Text className='text-red-500 text-xl font-medium ' style={{ opacity: 0.9 }}>📺  Series cultes</Text>
                    <PopularSeries/>
                </View>

                <View className='mt-8 px-8 gap-2'>
                    { genres.map((gender, index) => <MovieByGenre key={gender.id} genreId={gender.id} genreName={gender.name} /> ) }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Accueill;
