import { Text, View } from "react-native-ui-lib";
import { useSnapshot } from "valtio";
import { Type, objStore } from "@/store/obj";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { BackHandler } from 'react-native';
import { router } from "expo-router";
import { Message } from "@/lib/message";

export function Breadcrumb() {

    const [crumbs, setCrumbs] = useState<string[]>([])
    const objStare = useSnapshot(objStore)
    const [isExit, setIsExit] = useState(false)

    useEffect(() => {
        const path = objStare.path
        const arr = path.split('/').filter(item => !!item)
        setCrumbs(arr)
    }, [objStare, objStare.path])

    useEffect(() => {
        const onBackPress = () => {
            console.log('onBackPress', crumbs);
            console.log('crumbs',crumbs);
            const lastPathArr = crumbs.slice()
            lastPathArr.pop()
            console.log('lastPathArr',lastPathArr);
            const lastPath = lastPathArr ? `/${lastPathArr.join('/')}` : '/' 
            console.log('lastPath=>', lastPath);
            const url = `/?path=${lastPath}&type=${Type.Folder}`
            console.log('url=>', url);
            if(crumbs.length === 0) {
                if(isExit) {
                    BackHandler.exitApp()
                }
                if(!isExit) {
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
    }, [objStare,crumbs, isExit])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.crumbItem}>
                    <Text>主页</Text>
                </View>
                {
                    crumbs?.map(crumb => {
                        return (
                            <View style={styles.crumbItem}>
                                <Text key={crumb}>{crumb}</Text>
                            </View>
                        )
                    })
                }
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