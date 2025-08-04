import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actor, ActorMovie } from 'types/allType';
import { useNavigation } from '@react-navigation/native';
interface ActorListItemProps {
    actor: Actor,
}


const ActorListItem = ({ actor }: ActorListItemProps) => {
    const navigation = useNavigation<any>()

    const navigateToActor = () => navigation.navigate('ActorDetail', { id: actor.id });
    return (
        <TouchableOpacity key={actor.id} className="flex-row gap-4 items-center" onPress={() => navigateToActor()}>
            { actor.profile_path ? 
                <Image source={{ uri: `https://image.tmdb.org/t/p/w185${actor.profile_path}` }} className="w-16 h-20 rounded-md"/> : 
                <View className="w-16 h-20 bg-gray-600 rounded-md justify-center items-center">
                    <Text className="text-white text-xs text-center">Image non dispo</Text>
                </View>
            }
            <View>
                <Text className="text-white font-medium text-lg">{actor.name}</Text>
                {actor.known_for?.length > 0 && (
                    <Text className="text-gray-300 text-sm" numberOfLines={1}>
                        {actor.known_for.map((item: ActorMovie) => item.title || item.name).join(', ')}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

export default ActorListItem;
