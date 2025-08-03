/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import SubmitButton from '../../components/submitButton';
import { isEmpty } from 'utils/stringUtilis';
import ErrorMessage from '../../components/errorMessage';
import axios from 'axios';
import LoadingSpinner from '../../components/loadingSpinner';
import * as z from "zod"
import { useUserConnected } from 'store/userConnected'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Connexion'>;

const LoginPage = () => {
    const navigation = useNavigation<NavigationProp>();
    const [ loading, setLoading ] = useState(false);
    const setUserConnected = useUserConnected((state) => state.setUserConnected)
    const userConnected = useUserConnected((state) => state.userConnected)
    const [ error, setError ] = useState({ error: false, message: "Email ou mot de passe incorrecte" })

    useEffect(() => {
        if (userConnected) {
           navigation.replace('Tabs'); 
        }
    }, []);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const User = z.object({
        id: z.number(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        created: z.string().nullable(),
        profilImage: z.string().nullable()
    })

    const onFormSubmit = () => {
        setLoading(true)
        axios.post("https://movie-app-by-onek-ws.onrender.com/api/login", {email, password})
        .then((response) => {
            if (!response.data.success || !User.parse(response.data.user)) {
                setError({ error: true, message: "Une erreur c'est produite lors de la connexion" });
                return
            }
            setUserConnected(response.data.user);
            navigation.replace('Tabs');
        }).catch((error) => {
            setError({ error: true, message: "Email ou mot de passe incorrecte"});
            console.log(error)
        }).finally(() => {
            setError({ error: false, message: ""});
            setLoading(false)
        })
    }
    
    return (
        <View className='bg-red-700 h-full items-center flex-1 pt-[50%] px-8 ' >
            <View className='px-8' >
                <Image source={require("../../assets/logo.png")} className="w-80 h-24" style={{ resizeMode: 'contain' }}/>
            </View>
            <View className='bg-yellow-50 px-6 w-full py-10 rounded-2xl flex flex-col gap-5 '>
                <Text className=' text-xl font-bold text-center '>Connectez vous pour continuer</Text>
                <View className='mt-5 mb-5 gap-3'>
                    <View className='gap-2'>
                        <Text className=''>Email</Text>
                       <TextInput onChangeText={setEmail} className='border-2 border-gray-500 h-12  rounded-xl text-black pl-2  ' /> 
                    </View>
                    <View className='gap-2'>
                        <Text className=''>Mot de passe</Text>
                       <TextInput onChangeText={setPassword} className='border-2 border-gray-500 h-12  rounded-xl text-black pl-2  ' /> 
                    </View>
                </View>
                { error.error && <ErrorMessage message={error.message}/> }
                { loading && <LoadingSpinner size={70} /> }
                <SubmitButton whileSubmitMethod={onFormSubmit} loading={loading} text='Se connecter' disable={isEmpty(email) || isEmpty(password)}  />
            </View>
        </View>
    );
}

export default LoginPage;
