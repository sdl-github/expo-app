import {Colors, Text, View} from "react-native-ui-lib";
import {useSnapshot} from "valtio";
import {objStore} from "@/store/obj";
import {useEffect, useState} from "react";
import {StyleSheet} from "react-native";


export function Breadcrumb() {
    const [crumbs, setCrumbs] = useState<string[]>([])

    const objStare = useSnapshot(objStore)
    useEffect(() => {
        const path = objStare.path
        const arr = path.split('/').filter(item => !!item)
        setCrumbs(arr)
    }, [objStare, objStare.path])

    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text>主页></Text>
                </View>
                {
                    crumbs?.map(crumb => {
                        return (
                            <View style={styles.crumbItem}>
                                <Text key={crumb}>{crumb}></Text>
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
        backgroundColor: '#e2e2e2',
        borderRadius: 30,
        paddingHorizontal: 20,
        marginBottom: 10,
        marginHorizontal: 10
    },
    crumbItem: {
        marginLeft: 5
    }
});