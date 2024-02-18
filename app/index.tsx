import { StatusBar } from 'expo-status-bar'
import { Button, Text, View, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { Colors } from 'react-native-ui-lib'

// import './global.css'

export default function App() {
  return (
    <View style={{ flex: 1 }}>

      <View style={{ padding: 20 }}>
        <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>文件管理</Text>
          <TouchableOpacity onPress={() => router.push('/setting/server')}>
            <Text style={{ color: Colors.purple20 }}>服务器</Text>
          </TouchableOpacity>
        </View>

        <View style={{ display: 'flex', alignItems: 'center', paddingTop: '40%' }}>
          <Text style={{ fontWeight: 'bold' }}>空空如也</Text>
          <View style={{ marginTop: 10 }}>
            <Button
              title='新增服务器'
              // onPress={() => router.push('/setting/server/edit')}
              onPress={() => router.push('/setting/server')}
            >
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}
