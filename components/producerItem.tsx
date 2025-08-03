import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ProductionCompany } from 'types/allType';
interface ProducerItemProps {
    producer: ProductionCompany
}

const ProducerItem = ({ producer }: ProducerItemProps) => {
    return (
        <TouchableOpacity className="mr-4">
            <View className="h-24 w-full p-2 flex items-center justify-center bg-white rounded-2xl shadow">
                <Image className="h-full w-full object-contain" src={`https://image.tmdb.org/t/p/w500${producer.logo_path}`}/>
            </View>
            <View className="p-4">
                <Text className="text-lg font-semibold text-red-600" style={{ opacity: 0.9 }}>{producer.name}</Text>
                <Text className="text-sm text-zinc-300">{producer.origin_country === "US" ? "Etats Unis" : producer.origin_country}</Text>
            </View>
        </TouchableOpacity>  
    );
}

export default ProducerItem;
