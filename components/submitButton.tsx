import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LoadingSpinner from './loadingSpinner';
interface SubmitBtnType {
    whileSubmitMethod: () => void,
    text: string
    disable: boolean
    loading: boolean
}

const SubmitButton = ({ whileSubmitMethod, text, disable, loading }: SubmitBtnType) => {
    return (
        <TouchableOpacity onPress={whileSubmitMethod} className={` ${disable || loading ? 'bg-gray-600': 'bg-slate-900'  }  hover:bg-slate-950 py-3 rounded-lg`} disabled={disable} >
            <View>
                <Text className='text-white text-lg font-medium text-center '>{ loading ? "Connexion..." : text} </Text>
            </View>
        </TouchableOpacity>
    );
}

export default SubmitButton;
