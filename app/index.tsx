import { Button, Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { router, useGlobalSearchParams } from 'expo-router'
import NavBar from "@/components/NavBar";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { objStore, Type } from "@/store/obj";
import { useServer } from "@/hooks/use-server";
import useSWR from "swr";
import request from "@/lib/request";
import { FsListResp } from "@/lib/types/resp";
import { useSnapshot } from 'valtio'
import { Colors, Image, ListItem, SkeletonView } from "react-native-ui-lib";
import { fileIcon, folderIcon } from "@/assets/icons/base64-icon";
import { Breadcrumb } from "@/components/Breadcrumb";
import { usePath } from '@/hooks/use-path';
import FilePreview from '@/components/FilePreview'
import { videoPlayerStore } from '@/store/video-player';

export default function App() {

    const { store } = useServer()
    const state = useSnapshot(store)
    const videoPlayerState = useSnapshot(videoPlayerStore)
    const objState = useSnapshot(objStore)
    const { backToLast, goToPath } = usePath()
    const serverApi = state.server?.url
    const params = useGlobalSearchParams();
    const [searchParams] = useState({
        path: '/',
        password: '',
        page: 1,
        per_page: 0,
        refresh: false
    })

    const {
        isLoading,
        data,
        error,
        mutate
    } = useSWR(serverApi ? `${serverApi}/api/fs/list/${objStore.path}` : null, (): Promise<FsListResp> => {
        return request.post(`${serverApi}/api/fs/list`, {
            ...params,
            path: objStore.path
        })
    })

    const res = (data as FsListResp) || null

    return (
        <>
            {
                videoPlayerState.isFullscreen ? null :
                    <>
                        <NavBar
                            title='文件管理'
                            hiddenBack={false}
                            customLeft={(!params.path || params.path === '/') ? (
                                <TouchableOpacity onPress={() => router.navigate('/setting')}>
                                    <Ionicons name="settings-outline" size={24} color="black" />
                                </TouchableOpacity>
                            ) : undefined}
                            customLeftFun={params.path !== '/' && (() => {
                                backToLast()
                            }) || undefined}
                        />
                        <Breadcrumb />
                    </>
            }

            {
                isLoading ?
                    <>
                        <Text>loading</Text>
                    </> :
                    <>
                        {
                            objState.type === Type.Folder && <>
                                <ScrollView style={{ padding: 20, backgroundColor: '#F2F2F6', flex: 1 }}>
                                    {
                                        res && (res.content) && res.content.length ? (
                                            <>
                                                {
                                                    res.content.map((item, index) => {
                                                        return (
                                                            <ListItem
                                                                onPress={() => goToPath(item)}
                                                                key={index} style={styles.listItem}>
                                                                <View style={styles.listIcon}>
                                                                    <Image style={{ width: '100%', height: '100%' }}
                                                                        source={{ uri: item.is_dir ? folderIcon : fileIcon }} />
                                                                </View>
                                                                <View style={styles.listTitle}>
                                                                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                                                </View>
                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                            </>
                                        ) : (
                                            <View style={{ display: 'flex', alignItems: 'center', paddingTop: '40%' }}>
                                                <Text style={{ fontWeight: 'bold' }}>空空如也</Text>
                                            </View>
                                        )
                                    }
                                </ScrollView>
                            </>
                        }
                        {
                            objState.type === Type.File && <FilePreview />
                        }
                    </>
            }
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
    },
    listItem: {
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        height: 60,
        width: '100%',
        alignItems: 'center',
        overflow: "hidden"
    },
    listIcon: {
        width: 24,
        height: 24
    },
    listTitle: {
        marginLeft: 10
    }
});