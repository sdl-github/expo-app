import NavBar from '@/components/NavBar'
import { Text, View, ListItem, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { ScrollView, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Page() {
  return (
    <>
      <NavBar title={"设置"} />
      <ScrollView style={{ padding: 20, backgroundColor: '#F2F2F6', flex: 1 }}>
        <View style={styles.card}>
          <ListItem onPress={() => { router.push('/setting/server') }} style={styles.listItem}>
            <View style={styles.item}>
              <View style={styles.icon}>
                <FontAwesome5 name="server" size={24} color="black" />
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>服务器</Text>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </View>
          </ListItem>
        </View>
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden'
  },
  listItem: {
    width: '100%',
    height: 50,
  },
  item: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  icon: {
    width: 25,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#C6C6C8',
    borderBottomWidth: 0.5,
    marginLeft: 10,
    paddingVertical: 5
  },
  title: {
    fontWeight: 'bold',
    color: Colors.$backgroundDark
  }
})