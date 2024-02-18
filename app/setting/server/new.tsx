import { Text, View, TextField, Button } from 'react-native-ui-lib'
import { StatusBar } from 'expo-status-bar'

export default function Page() {
  function onChangeText() { }
  return (
        <>
            <StatusBar backgroundColor='#F2F2F6' />
            <View style={{ padding: 20, backgroundColor: '#F2F2F6', flex: 1 }}>
              <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>新增服务器</Text>
              </View>
              <Text>请填写服务器信息</Text>
              <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#FFFFFF', marginTop: 20 }}>
                <View style={{ borderBottomColor: '#e2e2e2', borderBottomWidth: 1, marginBottom: 10 }}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ color: '#000000' }}>服务器</Text>
                    <Text style={{ color: 'red', paddingLeft: 2 }} >*</Text>
                  </View>
                  <TextField
                    placeholder={'请输入服务器地址'}
                    onChangeText={onChangeText}
                    validate={['required']}
                    validationMessage={['请输入服务器地址']}
                  />
                </View>
                <View style={{ borderBottomColor: '#e2e2e2', borderBottomWidth: 1, marginBottom: 10 }}>
                  <Text style={{ color: '#000000' }}>用户名</Text>
                  <TextField
                    placeholder={'请输入用户名'}
                    onChangeText={onChangeText}
                    validate={['required']}
                    validationMessage={['请输入用户名']}
                  />
                </View>
                <View style={{}}>
                  <Text style={{ color: '#000000' }}>密码</Text>
                  <TextField
                    placeholder={'请输入密码'}
                    onChangeText={onChangeText}
                    validate={['required']}
                    validationMessage={['请输入密码']}
                  />
                </View>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Button style={{ marginTop: 20 }}>
                  <Text color={'white'}>保存</Text>
                </Button>
              </View>
            </View>
        </>
  )
}
