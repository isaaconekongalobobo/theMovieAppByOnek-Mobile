import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { Actor } from 'types/allType';
import { useNavigation } from '@react-navigation/native';

interface ActorItemProps {
    actor: Actor
}
const ActorItem = ({ actor }: ActorItemProps) => {
    const navigation = useNavigation<any>()

    const navigateToActor = () => navigation.navigate('ActorDetail', { id: actor.id });
    const imageUrl = actor.profile_path? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : 'https://res.cloudinary.com/do2qnb4zc/image/upload/v1754254571/person_bjsl3w.png';
    return (
        <TouchableOpacity className="mr-4 items-center justify-center gap-4" onPress={navigateToActor}>
            <Image className="bg-center bg-cover size-40 rounded-full object-cover" src={imageUrl}/>
            <Text className="text-lg text-center font-semibold text-red-600">{actor.name}</Text>
        </TouchableOpacity>        
    )
}

export default ActorItem;
