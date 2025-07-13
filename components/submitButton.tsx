import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
interface SubmitBtnType {
    whileSubmitMethod: () => void,
    text: string
    disable: boolean
}

const SubmitButton = ({ whileSubmitMethod, text, disable }: SubmitBtnType) => {
    return (
        <TouchableOpacity className={` ${disable ? 'bg-gray-600': 'bg-slate-900'  }  hover:bg-slate-950 py-3 rounded-lg`} disabled={disable} >
            <Text className='text-white text-lg font-medium text-center ' >{text} </Text>
        </TouchableOpacity>
    );
}

export default SubmitButton;
