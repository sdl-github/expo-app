import { StatusBar } from 'expo-status-bar'
import { ListItem, Text, View, TouchableOpacity, Colors, Button } from 'react-native-ui-lib'
import { router } from 'expo-router'
import { useSnapshot } from 'valtio'
import { useServer } from '../../../hooks/use-server'
import Toast from 'react-native-toast-message';

export default function Page() {
  const { store, delServer, setServer } = useServer()

  const state = useSnapshot(store)

  async function handleDel(server: any) {
    await delServer(server)
    Toast.show({
      type: 'success',
      text1: '删除成功',
      visibilityTime: 2000
    });
  }

  async function handleSetServer(server: any) {
    await setServer(server)
    Toast.show({
      type: 'success',
      text1: '设置成功',
      visibilityTime: 2000
    });
  }

  return (
    <>
      <StatusBar backgroundColor='#F2F2F6' />
      <View style={{ padding: 20, backgroundColor: '#F2F2F6', flex: 1 }}>
        <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <View style={{}}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text>返回</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>服务器</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/setting/server/new')}>
            <Text>新建</Text>
          </TouchableOpacity>
        </View>
        <Text>服务器列表</Text>
        <View style={{ marginTop: 20 }} >
          {
            state.serverList.length ? (
              <>
                {
                  state.serverList?.map((server, index) => {
                    return (
                      <ListItem onPress={() => handleSetServer(server)} key={index} style={{ marginBottom: 10, paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 10, display: 'flex', height: 60, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <View style={{ width: '100%', paddingTop: '20%', display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                  <Text style={{ fontWeight: 'bold' }}>空空如也</Text>
                </View>
              </>
            )
          }
        </View>
      </View>
    </>
  )
}
