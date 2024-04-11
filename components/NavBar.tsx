import { Text, View, StatusBar as Bar, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { TouchableOpacity } from "react-native-ui-lib";
import { router } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { ReactElement } from "react";

const barHeight = Bar.currentHeight

interface IProps {
    statusBarColor?: string
    title?: string
    titleStyle?: StyleProp<TextStyle>
    style?: StyleProp<TextStyle>
    hiddenBack?: boolean
    hiddenTitle?: boolean
    customLeft?: ReactElement
    customRight?: ReactElement
    customLeftFun?: () => void
}

export default function NavBar(props: IProps) {
    const {
        statusBarColor, title, titleStyle, style,
        hiddenBack, hiddenTitle, customLeft, customRight, customLeftFun
    } = props
    return (
        <View style={{ ...styles.nav, paddingTop: barHeight }}>
            <StatusBar backgroundColor={statusBarColor} />
            <View style={styles.fun}>
                {!!customLeft ? customLeft : (!hiddenBack && <TouchableOpacity onPress={() => customLeftFun && customLeftFun() || router.back()}>
                    <AntDesign  size={20} name="arrowleft" style={styles.icon} />
                </TouchableOpacity>)}
            </View>
            <View>
                {!hiddenTitle && <Text style={{ ...styles.title }}>{title}</Text>}
            </View>
            <View style={styles.fun}>
                {customRight && customRight}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    nav: {
        paddingHorizontal: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 80,
    },
    icon: {
        fontWeight: '500',
        fontSize: 22,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
    },
    fun: {
        width: 50,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    }
});