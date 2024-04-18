import { Button, View } from "react-native-ui-lib";
import { Video, ResizeMode, VideoFullscreenUpdate, VideoFullscreenUpdateEvent } from 'expo-av';
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import VideoPlayer from 'expo-video-player'
import * as ScreenOrientation from "expo-screen-orientation";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useSnapshot } from "valtio";
import { videoPlayerStore } from "@/store/video-player";

interface IProps {
    url: string
}
export default function Player(props: IProps) {
    const { url } = props
    const video = React.useRef(null);
    const [orientation, setOrientation] = useState(1);
    const videoPlayerState = useSnapshot(videoPlayerStore)

    const [screenWidth, setScreenWidth] = useState(() => Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState( () => Dimensions.get('window').height)

    const toggleFullscreen = async () => {
        if (!videoPlayerState.isFullscreen) {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
            );
            videoPlayerStore.isFullscreen = true
        } else {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
            videoPlayerStore.isFullscreen = false
        }
        setOrientation(await ScreenOrientation.getOrientationAsync());
        
    };


    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart((event) => {
            console.log('double tap');
        })
    const singleTap = Gesture.Tap()
        .onStart((event) => {
            console.log('single tap');
        })


    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
                <VideoPlayer
                    style={{
                        ...(
                            videoPlayerState.isFullscreen ? {
                                width: screenWidth,
                                height: screenHeight
                            } : {
                                height: 200
                            }
                        )
                    }}
                    slider={{
                    }}
                    fullscreen={{
                        inFullscreen: videoPlayerState.isFullscreen,
                        enterFullscreen: () => {
                            toggleFullscreen()
                        },
                        exitFullscreen: () => {
                            toggleFullscreen()
                        }
                    }}
                    videoProps={{
                        shouldPlay: true,
                        resizeMode: ResizeMode.CONTAIN,
                        source: {
                            uri: url,
                        },
                    }}
                />
            </GestureDetector>

        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
    },
    video: {
        height: 400,
        width: '100%'
    }
})
