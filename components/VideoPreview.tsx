import { useServer } from "@/hooks/use-server"
import { objStore } from "@/store/obj"
import { useEffect, useState } from "react"
import { View, Text } from "react-native-ui-lib"
import { useSnapshot } from "valtio"
import useSWRImmutable from 'swr/immutable'
import { LiveTranscodingTaskList, PreviewData } from "@/lib/types"
import request from "@/lib/request"
import Video from "./Video"

export function VideoPreview() {
    const { store } = useServer()
    const state = useSnapshot(store)
    const objState = useSnapshot(objStore)
    const serverApi = state.server?.url
    const [url,setUrl] = useState('')

    const [params, setParams] = useState({
        password: '',
        method: "video_preview",
    })
    const { isLoading, data, error, mutate } = useSWRImmutable(serverApi ? `${serverApi}/api/fs/other/${objState.path}` : null, (): Promise<PreviewData> => {
        return request.post(`${serverApi}/api/fs/other`, {
            ...params,
            path: objState.path
        })
    })

    useEffect(() => {
        if (!data) {
            return
        }
        let list = [] as LiveTranscodingTaskList[]
        list = data.video_preview_play_info.live_transcoding_task_list.filter(
            (l) => l.url
        ) || []
        if (list.length === 0) {
            console.log("No transcoding video found")
            return
        }
        const url = list[list.length - 1].url
        setUrl(url)
        return () => {
            console.log('destroy==>');
        }
    }, [data])

    return (
        <>
            <View>
                {
                    isLoading ?
                        <>
                            <Text>isLoading...</Text>
                        </> :
                        <>
                            <View>
                                <Video url={url}/>
                            </View>
                        </>
                }
            </View>
        </>
    )
}