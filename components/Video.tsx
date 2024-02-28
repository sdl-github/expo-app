import { Button, View } from "react-native-ui-lib";
import { Video, ResizeMode } from 'expo-av';
import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import VideoPlayer from 'expo-video-player'

export default function Player() {
    const video = React.useRef(null);

    return (
        <View style={styles.container}>
            <VideoPlayer
                style={{
                    height: 200,
                }}
                slider={{
                    
                }}
                fullscreen={{
                    enterFullscreen: () => {}
                }}
                videoProps={{
                    shouldPlay: true,
                    resizeMode: ResizeMode.CONTAIN,
                    source: {
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    },
                }}
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
