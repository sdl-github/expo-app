import {Text, View, TextField, Button} from 'react-native-ui-lib'
import {router} from 'expo-router'
import {Formik} from 'formik';
import {useServer} from '@/hooks/use-server';
import NavBar from '@/components/NavBar';
import {Message} from '@/lib/message';
import {useState} from "react";
import request from "@/lib/request";
import {setToken} from "@/lib/auth";

export default function Page() {
    const [loading, setLoading] = useState(false)
    const {addServer} = useServer()
    const handleSubmit = (values: Record<string, any>) => {
        const { username, password, url } = values
        setLoading(true)
        if (!username && !password) {
            request({ url: `${url}/api/public/settings`, method: 'GET' }).then(async (res: any) => {
                if (res.version) {
                    try {
                        await addServer({url})
                        setLoading(false)
                        Message.success('添加成功')
                        router.back()
                    } catch (e) {
                        setLoading(false)
                        Message.error("服务器已存在")
                    }
                    return
                }
                throw new Error()
            }).catch(() => {
                Message.info('连接服务器错误')
            }).finally(() => {
                setLoading(false)
            })
            return
        }
        request({ url: `${url}/api/auth/login`, method: 'POST', data: { username, password } })
            .then(async (res: any) => {
                if (res.token) {
                    await setToken(res.token)
                    try {
                        await addServer({url})
                        setLoading(false)
                        Message.success('添加成功')
                        router.back()
                    } catch (e) {
                        setLoading(false)
                        Message.error("服务器已存在")
                    }
                    return
                }
                throw new Error()
            })
            .catch(() => {
                Message.info('连接服务器错误')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <NavBar
                title={"新建服务器"}
            />
            <View style={{padding: 20, backgroundColor: '#F2F2F6', flex: 1}}>
                <Text>请填写服务器信息</Text>
                <Formik
                    initialValues={{url: 'https://alist.halozero.cn', username: '', password: ''}}
                    onSubmit={handleSubmit}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <>
                            <View style={{padding: 10, borderRadius: 10, backgroundColor: '#FFFFFF', marginTop: 20}}>
                                <View style={{borderBottomColor: '#e2e2e2', borderBottomWidth: 1, marginBottom: 10}}>
                                    <View style={{display: 'flex', flexDirection: 'row'}}>
                                        <Text style={{color: '#000000'}}>服务器</Text>
                                        <Text style={{color: 'red', paddingLeft: 2}}>*</Text>
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
                                <View style={{borderBottomColor: '#e2e2e2', borderBottomWidth: 1,}}>
                                    <Text style={{color: '#000000'}}>用户名</Text>
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
                                    <Text style={{color: '#000000'}}>密码</Text>
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
                            <View style={{paddingHorizontal: 10}}>
                                <Button disabled={loading} onPress={() => handleSubmit()} style={{marginTop: 20}}>
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
