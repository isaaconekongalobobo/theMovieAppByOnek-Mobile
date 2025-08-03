import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, InteractionManager } from 'react-native';
import { useUserConnected } from 'store/userConnected';

const Me = ({ navigation }: any) => {
    const { userConnected, setUserConnected } = useUserConnected();

    const handleLogout = () => {
        Alert.alert(
        'Déconnexion',
        'Voulez-vous vraiment vous déconnecter ?',
        [
            { text: 'Annuler', style: 'cancel' },
            {
            text: 'Se déconnecter',
            style: 'destructive',
            onPress: () => {
                setUserConnected(null);
                InteractionManager.runAfterInteractions(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Authentication' }],
                });
                });
            },
            },
        ],
        { cancelable: true }
        );
    };

    const goToEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    if (!userConnected) {
        return (
        <View className="flex-1 justify-center items-center bg-black">
            <Text className="text-lg text-gray-400">Aucun utilisateur connecté.</Text>
        </View>
        );
    }

    return (
        <View className="flex-1 items-center bg-black px-6 pt-10">
            {userConnected.profilImage ? ( <Image source={{ uri: userConnected.profilImage }} className="w-24 h-24 rounded-full mb-4"/>
            ) : (
                <View className="w-24 h-24 rounded-full bg-gray-600 justify-center items-center mb-4">
                    <Text className="text-3xl text-white font-bold">
                        {userConnected.firstName?.[0]}
                        {userConnected.lastName?.[0]}
                    </Text>
                </View>
            )}

            <View className="items-center mb-6">
                <Text className="text-xl font-semibold text-white">
                {userConnected.firstName} {userConnected.lastName}
                </Text>
                <Text className="text-base text-gray-300">{userConnected.email}</Text>
                {userConnected.created && (
                <Text className="text-sm text-gray-400 mt-1">
                    Compte créé le : {new Date(userConnected.created).toLocaleDateString()}
                </Text>
                )}
            </View>

            <View className="w-full space-y-3 gap-4">
                <TouchableOpacity onPress={goToEditProfile} className="bg-white py-3 rounded-full items-center">
                    <Text className="text-base font-medium text-black">Modifier mon profil</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout} className="bg-red-600 py-3 rounded-full items-center">
                    <Text className="text-base font-medium text-white">Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Me;
