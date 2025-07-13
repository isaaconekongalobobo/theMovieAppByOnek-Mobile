import React from 'react';
import { Text, View } from 'react-native';
import { ErrorMessageType } from 'types/allType';

const ErrorMessage = ({ message = "Une erreur c'est produite"}: ErrorMessageType) => {
    return (
        <View className='items-center'>
          <Text className='font-medium text-red-700'> {message} </Text>
        </View>
    );
}

export default ErrorMessage;
