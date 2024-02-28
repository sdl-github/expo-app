import {Button, View} from "react-native-ui-lib";
import {Video, ResizeMode} from 'expo-av';
import React,{useRef} from "react";
import {StyleSheet} from "react-native";

export default function VideoPlayer(props) {
    const video = React.useRef(null);

    return (
        <View style={styles.container}>
            <Video
                style={styles.video}
                ref={video}
                source={{
                    uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                useNativeControls={false}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    video: {
        height: 400,
        width: '100%'
    }
})
