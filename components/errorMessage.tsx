import React from 'react';
import { Text, View } from 'react-native';
import { ErrorMessageType } from 'types/allType';

const ErrorMessage = ({ message = "Une erreur c'est produite"}: ErrorMessageType) => {
    return (
        <View>
          <Text> {message} </Text>
        </View>
    );
}

export default ErrorMessage;
