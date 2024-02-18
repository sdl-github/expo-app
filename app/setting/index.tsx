import { Text, View } from 'react-native'

export default function Page() {
  return (
        <>
            <View style={{ padding: 10 }}>
              <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>设置</Text>
              </View>
            </View>
        </>
  )
}
