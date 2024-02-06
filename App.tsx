import { StatusBar } from "expo-status-bar";
import {
  Colors,
  Dialog,
  View,
  PanningProvider,
  Card,
  CardProps,
  Button,
  Text,
} from "react-native-ui-lib";

import "./global.css";
import { useState } from "react";

export default function App() {
  const [isVisible, setIsVisible] = useState(true)
  return (
    <View className="flex-1 items-center justify-center ">
      <StatusBar style="auto" />
      <Text>空空如也</Text>
      <Button
        className="mt-5"
        label={"新增服务器"}
        size={Button.sizes.medium}
        backgroundColor={Colors.red30}
      />
    </View>
  );
}
