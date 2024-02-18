import { StatusBar } from 'expo-status-bar'
import { ListItem, Text, View, TouchableOpacity, Colors, Button } from 'react-native-ui-lib'
import { router } from 'expo-router'

export default function Page() {
  return (
        <>
            <StatusBar backgroundColor='#F2F2F6' />
            <View style={{ padding: 20, backgroundColor: '#F2F2F6', flex: 1 }}>
              <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>服务器</Text>
                <TouchableOpacity onPress={() => router.push('/setting/server/new')}>
                  <Text style={{ color: Colors.purple20 }}>新建</Text>
                </TouchableOpacity>
              </View>
              <Text>服务器列表</Text>
              <View style={{ marginTop: 20 }}>
                <ListItem style={{ marginBottom: 10, backgroundColor: 'white', borderRadius: 10, display: 'flex', height: 60, width: '100%', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{}}>
                    <Text style={{ fontWeight: 'bold' }}>http://127.0.0.1:8080</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{}}>
                      <Button backgroundColor={Colors.red10} size='small' label='删除'></Button>
                    </View>
                    <View style={{ marginLeft: 5 }}>
                      <Button backgroundColor={Colors.purple20} size='small' label='切换'></Button>
                    </View>
                  </View>
                </ListItem>
              </View>
            </View>
        </>
  )
}
