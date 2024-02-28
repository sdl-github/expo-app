import { Button, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { router } from 'expo-router'
import NavBar from "@/components/NavBar";
import { Ionicons } from '@expo/vector-icons';

export default function App() {
    return (
        <>
            <NavBar
                title={'文件管理'}
                hiddenBack={true}
                customLeft={(
                    <TouchableOpacity onPress={() => router.navigate('/setting')}>
                        <Ionicons name="settings-outline" size={24} color="black" />
                    </TouchableOpacity>
                )}
                customRight={(
                    <TouchableOpacity onPress={() => router.navigate('/setting')}>
                        <Ionicons name="settings-outline" size={24} color="black" />
                    </TouchableOpacity>
                )}
            />
            <ScrollView style={{ padding: 20, backgroundColor: '#F2F2F6', flex: 1 }}>
                <View style={{ display: 'flex', alignItems: 'center', paddingTop: '40%' }}>
                    <Text style={{ fontWeight: 'bold' }}>空空如也</Text>
                </View>
            </ScrollView>
        </>
    )
}
