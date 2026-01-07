import useLocalStore from '@/zustland/localStore';
import {useEffect, useState} from 'react';

export default function useSetting() {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const {language, setLanguage} = useLocalStore();

    useEffect(() => {
        setIsEnabled(language === 'RU');
    }, [language]);

const toggleSwitch = (value: boolean) => {
    setIsEnabled(() => value);
    setLanguage(value ? 'RU' : 'EN');
};

 return{
    isEnabled,
    toggleSwitch,
 };
}
