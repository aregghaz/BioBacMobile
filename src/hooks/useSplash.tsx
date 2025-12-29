
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useEffect } from 'react';
import type {RootStackParamList} from '../navigation/types';
export default function useSplash() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('SignIn');
        }, 2000);
    }, [navigation]);
}
