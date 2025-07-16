import React from 'react';
import { Image, ScrollView, Text, View} from 'react-native';

const Accueill = () => {
    return (
        <View className='h-full bg-black justify-center items-center' style={{ paddingHorizontal: 10 }} >
            <ScrollView className='w-full pt-20' >
                <View className='items-center gap-5'>
                    <Image source={require('../../assets/avatar-cover.jpg')}  className='w-[90%] h-44 rounded-xl ' />
                        <Text className='text-red-600 text-[1.5rem] font-semibold text-left '>Votre plaisir commence ici</Text>
                        <Text className='text-white px-10 text-center'>Découvrez les meilleurs films et series actuels et explorer le sptième art avec une experience inedit...</Text>                    
                </View>
            </ScrollView>
        </View>
    );
}


export default Accueill;
