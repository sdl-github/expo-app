import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useSnapshot } from "valtio";
import { Type, objStore } from "@/store/obj";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { BackHandler } from 'react-native';
import { router } from "expo-router";
import { Message } from "@/lib/message";

export function Breadcrumb() {

    const [crumbs, setCrumbs] = useState<string[]>([])
    const objStare = useSnapshot(objStore)
    const [isExit, setIsExit] = useState(false)

    function handleGoPath(path: string) {
        const index = crumbs.findIndex(item => item === path)
        const toPath = crumbs.slice(0, index + 1).join('/')
        router.push(`/?path=${toPath}&type=${Type.Folder}`)
    }

    useEffect(() => {
        const path = objStare.path
        const arr = path.split('/').filter(item => !!item)
        setCrumbs(arr)
    }, [objStare, objStare.path])

    useEffect(() => {
        const onBackPress = () => {
            const lastPathArr = crumbs.slice()
            lastPathArr.pop()
            const lastPath = lastPathArr ? `/${lastPathArr.join('/')}` : '/'
            const url = `/?path=${lastPath}&type=${Type.Folder}`
            if (crumbs.length === 0) {
                if (isExit) {
                    BackHandler.exitApp()
                }
                if (!isExit) {
                    setIsExit(true)
                    Message.info('再按一次退出应用')
                    setTimeout(() => {
                        setIsExit(false)
                    }, 2000);
                }
                return true;
            }
            router.navigate(url)
            return true;
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
    }, [objStare, crumbs, isExit])

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleGoPath('/')}>
                    <View style={styles.crumbItem}>
                        <Text>主页</Text>
                    </View>
                </TouchableOpacity>
                <ScrollView horizontal={true}>
                    {
                        crumbs?.map(crumb => {
                            return (
                                <TouchableOpacity key={crumb} onPress={() => handleGoPath(crumb)}>
                                    <View style={styles.crumbItem}>
                                        <Text key={crumb}>{crumb}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 38,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    crumbItem: {
        marginLeft: 5,
        backgroundColor: '#F6F6F6',
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});