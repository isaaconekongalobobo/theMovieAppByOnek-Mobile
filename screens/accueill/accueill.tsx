import React from 'react';
import { Image, ScrollView, Text, View} from 'react-native';
import PopularMovie from './components/popularMovie';
import PopularSeries from './components/popularSeries';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                <View className='mt-8 px-8'>
                    <Text className='text-white text-xl font-medium ' style={{ opacity: 0.9 }}>🧩  Categories</Text>
                </View>
                <View className='mt-8 px-8'>
                    <Text className='text-white text-xl font-medium ' style={{ opacity: 0.9 }}>🎁 Favoris</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Accueill;
