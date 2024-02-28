import { Slot } from 'expo-router';
import Toast, { BaseToast, ErrorToast, ToastConfigParams } from 'react-native-toast-message';
import { View, Text, Colors } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

const toastConfig = {
    message: ({ text1, props }: ToastConfigParams<any>) => (
        <View style={styles.container}>
            <View>
                <Text>{props.icon}</Text>
            </View>
            <View style={{ marginLeft: 5 }}>
                <Text style={{ color: 'white' }}>{text1}</Text>
            </View>
        </View>
    )
};

export default function Layout() {
    return (
        <>
            <Slot />
            <Toast config={toastConfig} />
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 38,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.grey10,
        borderRadius: 30,
        paddingHorizontal: 20,
    }
});