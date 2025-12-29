
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useEffect } from 'react';
import type {RootStackParamList} from '../navigation/types';
import useAuthStore from '@/zustland/authStore';
export default function useSplash() {
    const{isLoggedIn} = useAuthStore();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        setTimeout(() => {
            if(isLoggedIn) {
                navigation.navigate('Tabs');
            } else {
                navigation.navigate('SignIn');
            }
        }, 2000);
    }, [navigation,isLoggedIn]);
}
