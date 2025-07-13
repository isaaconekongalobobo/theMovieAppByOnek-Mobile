import React, { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import SubmitButton from './submitButton';
import { isEmpty } from 'utils/stringUtilis';
import ErrorMessage from './errorMessage';
import axios from 'axios';
import LoadingSpinner from './loadingSpinner';
const LoginPage = () => {
    const [ loading, setLoading ] = useState(false);
    const [ disable, setDisable ] = useState(true)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ error, setError ] = useState({ error: true, message: "Email ou mot de passe incorrecte" })

    const onFormSubmit = () => {
        setLoading(true)
        axios.post("")
        .then((response) => {

        }).catch((error) => {

        }).finally()
    }
    return (
        <View className='bg-red-700 h-full items-center flex-1 pt-[50%] px-8 ' >
            <View className='px-8' >
                <Image source={require("../assets/logo.png")}
                className="w-80 h-24"
                style={{ resizeMode: 'contain' }}
                />
            </View>
            <View className='bg-yellow-50 px-6 w-full py-10 rounded-2xl flex flex-col gap-5 '>
                <Text className=' text-lg font-medium text-center '>Connectez vous pour continuer</Text>
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
