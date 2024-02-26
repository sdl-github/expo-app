import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Layout() {

  return (
    <>
      <Slot />
      <Toast />
    </>
  )
}
