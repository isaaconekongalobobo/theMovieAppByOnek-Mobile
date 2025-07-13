import { View } from 'react-native';
import LottieView from 'lottie-react-native';

interface LoadingSpinnerProps {
  size: number;
}

export default function LoadingSpinner({ size }: LoadingSpinnerProps) {
  return (
    <View className='flex items-center justify-center'>
      <LottieView source={require('../assets/animations/Loading.json')} speed={1.5} autoPlay loop style={{ width: size, height: size }} resizeMode="contain"/>
    </View>
  );
}
