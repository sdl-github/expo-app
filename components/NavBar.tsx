import {Text, View, StatusBar as Bar, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {TextStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {TouchableOpacity} from "react-native-ui-lib";
import {router} from "expo-router";
import {AntDesign} from '@expo/vector-icons';

const barHeight = Bar.currentHeight

interface IProps {
    statusBarColor?: string
    title?: string
    titleStyle?: StyleProp<TextStyle>
    style?: StyleProp<TextStyle>
    hiddenBack?: boolean
    hiddenTitle?: boolean
}

export default function NavBar(props: IProps) {
    const {
        statusBarColor, title, titleStyle, style,
        hiddenBack, hiddenTitle
    } = props
    return (
        <View style={{...styles.nav, paddingTop: barHeight, ...style}}>
            <StatusBar backgroundColor={statusBarColor}/>
            <View style={styles.fun}>
                {!hiddenBack && <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" style={styles.icon}/>
                </TouchableOpacity>}
            </View>
            <View>
                {!hiddenTitle && <Text style={{...styles.title, ...titleStyle}}>{title}</Text>}
            </View>
            <View style={styles.fun}>
                <Text></Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    nav: {
        paddingHorizontal: 20,
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
    }
});