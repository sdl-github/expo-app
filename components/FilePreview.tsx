import { IPreview } from "@/lib/types"
import { Obj, ObjType } from "@/lib/types/obj"
import { VideoPreview } from "./VideoPreview"
import { ImagePreview } from "./ImagePreview"
import { NotPreview } from "./NotPreview"
import { useSnapshot } from "valtio"
import { useServer } from "@/hooks/use-server"
import useSWR from "swr"
import request from "@/lib/request"
import { objStore } from "@/store/obj"
import { useState } from "react"
import { View, Text } from "react-native-ui-lib"
import { FsGetResp } from "@/lib/types/resp"

export type PreviewComponent = Pick<IPreview, "name" | "component">

const previews: IPreview[] = [
    {
        name: "Aliyun Video Previewer",
        type: ObjType.VIDEO,
        provider: /^Aliyundrive(Open)?$/,
        component: <VideoPreview />
    },
    {
        name: "Markdown",
        type: ObjType.TEXT,
    },
    {
        name: "Markdown with word wrap",
        type: ObjType.TEXT,
    },
    {
        name: "Text Editor",
        type: ObjType.TEXT,
    },
    {
        name: "HTML render",
        exts: ["html"],
    },
    {
        name: "Image",
        type: ObjType.IMAGE,
        component: <ImagePreview />
    },
    {
        name: "Video",
        type: ObjType.VIDEO,
    },
    {
        name: "Audio",
        type: ObjType.AUDIO,
    },
    {
        name: "Ipa",
        exts: ["ipa", "tipa"],
    },
    {
        name: "Plist",
        exts: ["plist"],
    },
    {
        name: "Aliyun Office Previewer",
        exts: ["doc", "docx", "ppt", "pptx", "xls", "xlsx", "pdf"],
        provider: /^Aliyundrive(Share)?$/,
    },
    {
        name: '*',
        exts: "*",
        component: <NotPreview />
    }
]
const ext = (path: string): string => {
    return path.split(".").pop() ?? ""
}

function getPreviewComp(file: Obj & { provider: string }) {
    const comp = previews.find(preview => {
        if (
            preview.type === file.type ||
            preview.exts === "*" ||
            preview.exts?.includes(ext(file.name).toLowerCase())
        ) {
            return true
        }
    })
    return comp?.component
}

export default function FilePreview() {
    const [params, setParams] = useState({
        password: '',
    })
    const { store } = useServer()
    const state = useSnapshot(store)
    const objState = useSnapshot(objStore)
    const serverApi = state.server?.url
    const { isLoading, data, error, mutate } = useSWR(serverApi ? `${serverApi}/api/fs/get/${objState.path}` : null, (): Promise<FsGetResp> => {
        return request.post(`${serverApi}/api/fs/get`, {
            ...params,
            path: objState.path
        })
    })

    return (
        <>
            <View>
                {
                    isLoading ?
                        <>
                            <Text>isLoading...</Text>
                        </> :
                        <>
                            {
                                data && getPreviewComp(data)
                            }
                        </>
                }
            </View>
        </>
    )
}