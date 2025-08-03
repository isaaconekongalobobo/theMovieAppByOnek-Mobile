import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actor } from 'types/allType';
interface ActorItemProps {
    actor: Actor
}
const ActorItem = ({ actor }: ActorItemProps) => {
    const imageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
    : '/images/person.png';
    return (
        <TouchableOpacity className="mr-4">
            <Image className="bg-center bg-cover size-40 rounded-2xl object-cover" src={imageUrl}/>
            <View className="p-4">
                <Text className="text-lg font-semibold text-red-600">{actor.name}</Text>
                <Text className="text-sm text-zinc-400">comme {actor.character}</Text>
            </View>
        </TouchableOpacity>        
    )
}

export default ActorItem;
