import { ScrollView } from 'react-native'
import { ListItem, Text, View, TouchableOpacity } from 'react-native-ui-lib'
import { useSnapshot } from 'valtio'
import { useServer } from '@/hooks/use-server'
import NavBar from "@/components/NavBar";
import { Message } from "@/lib/message";
import { router } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Page() {

    const { store, delServer, setServer } = useServer()
    const state = useSnapshot(store)

    async function handleDel(server: any) {
        await delServer(server)
        Message.success('删除成功')
    }

    async function handleSetServer(server: any) {
        await setServer(server)
        Message.success('设置成功')
    }

    return (
        <>
            <NavBar
                title={"服务器列表"}
                customRight={(
                    <TouchableOpacity onPress={() => router.navigate('/setting/server/new')}>
                        <FontAwesome6 name="add" size={20} color="black" />
                    </TouchableOpacity>
                )}
            />
            <ScrollView style={{ padding: 20, backgroundColor: '#F2F2F6', flex: 1 }}>
                <Text>服务器列表</Text>
                <View style={{ marginTop: 20 }}>
                    {
                        state.serverList && state.serverList.length ? (
                            <>
                                {
                                    state.serverList?.map((server, index) => {
                                        return (
                                            <ListItem onPress={() => handleSetServer(server)} key={index} style={{
                                                marginBottom: 10,
                                                paddingHorizontal: 10,
                                                backgroundColor: 'white',
                                                borderRadius: 10,
                                                display: 'flex',
                                                height: 60,
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                {
                                                    state.server?.url === server.url && state.server.username === state.server.username && (
                                                        <View>
                                                            <Text>选中项目</Text>
                                                        </View>
                                                    )
                                                }
                                                <View style={{}}>
                                                    <Text style={{ fontWeight: 'bold' }}>{server.url}</Text>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <View>
                                                        <TouchableOpacity onPress={() => handleDel(server)}>
                                                            <Text>删除</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </ListItem>
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <>
                                <View style={{
                                    width: '100%',
                                    paddingTop: '20%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center"
                                }}>
                                    <Text style={{ fontWeight: 'bold' }}>空空如也</Text>
                                </View>
                            </>
                        )
                    }
                </View>
            </ScrollView>
        </>
    )
}
