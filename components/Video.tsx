import { Button, View } from "react-native-ui-lib";
import { Video, ResizeMode, VideoFullscreenUpdate, VideoFullscreenUpdateEvent } from 'expo-av';
import React, { useRef } from "react";
import { Platform, StyleSheet } from "react-native";
import VideoPlayer from 'expo-video-player'
import * as ScreenOrientation from "expo-screen-orientation";

interface IProps {
    url: string
}
export default function Player(props: IProps) {
    const { url } = props
    const video = React.useRef(null);
    // For Android, we need to unlock the screen to make the fullscreen feature work
    const onFullscreenUpdate = async ({ fullscreenUpdate }: VideoFullscreenUpdateEvent) => {
        if (Platform.OS === "android") {
            if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
                await ScreenOrientation.unlockAsync();
            } else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
                // lock the screen in Portrait orientation
                await ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.PORTRAIT
                );
            }
        }
    };

    return (
        <View style={styles.container}>
            <VideoPlayer
                style={{
                    height: 200,
                }}
                slider={{

                }}
                videoProps={{
                    onFullscreenUpdate: onFullscreenUpdate,
                    shouldPlay: true,
                    resizeMode: ResizeMode.CONTAIN,
                    source: {
                        uri: url,
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
