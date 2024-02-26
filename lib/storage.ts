import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setData(key: string, value: any) {
    try {
        const data = JSON.stringify(value)
        return await AsyncStorage.setItem(key, data);
    } catch (e) {
        console.log('set data err');
    }
}


export async function getData(key:string) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch(e) {
        console.log('get data err');
    }
}