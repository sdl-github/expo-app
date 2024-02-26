import { Text, View, TextField, Button, TouchableOpacity } from 'react-native-ui-lib'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { useServer } from '../../../hooks/use-server';

export default function Page() {
  const { addServer } = useServer()

  return (
    <>
      <StatusBar backgroundColor='#F2F2F6' />
      <View style={{ padding: 20, backgroundColor: '#F2F2F6', flex: 1 }}>
        <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <View style={{}}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text>返回</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>新建服务器</Text>
          </View>
        </View>
        <Text>请填写服务器信息</Text>
        <Formik
          initialValues={{ url: 'http://192.168.3.2:4023', username: 'admin', password: '' }}
          onSubmit={async (values) => {
            await addServer(values)
            Toast.show({
              type: 'success',
              text1: '创建成功',
              visibilityTime: 2000
            });
            router.back()
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#FFFFFF', marginTop: 20 }}>
                <View style={{ borderBottomColor: '#e2e2e2', borderBottomWidth: 1, marginBottom: 10 }}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ color: '#000000' }}>服务器</Text>
                    <Text style={{ color: 'red', paddingLeft: 2 }} >*</Text>
                  </View>
                  <TextField
                    onChangeText={handleChange('url')}
                    onBlur={handleBlur('url')}
                    value={values.url}
                    placeholder={'请输入服务器地址'}
                    validate={['required']}
                    validationMessage={['请输入服务器地址']}
                  />
                </View>
                <View style={{ borderBottomColor: '#e2e2e2', borderBottomWidth: 1, }}>
                  <Text style={{ color: '#000000' }}>用户名</Text>
                  <TextField
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    placeholder={'请输入用户名'}
                    validate={['required']}
                    validationMessage={['请输入用户名']}
                  />
                </View>
                <View style={{}}>
                  <Text style={{ color: '#000000' }}>密码</Text>
                  <TextField
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder={'请输入密码'}
                    validate={['required']}
                    validationMessage={['请输入密码']}
                  />
                </View>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Button onPress={() => handleSubmit()} style={{ marginTop: 20 }}>
                  <Text color={'white'}>保存</Text>
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </>
  )
}
