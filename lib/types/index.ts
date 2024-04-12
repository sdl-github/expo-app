import { ObjType } from "./obj"

export interface IPreview {
    name: string
    type?: ObjType
    exts?: string[] | "*"
    provider?: RegExp
    component?: JSX.Element
}


export interface Meta {
    duration: number
    height: number
    width: number
}

export interface PreviewData {
    drive_id: string
    file_id: string
    video_preview_play_info: VideoPreviewPlayInfo
}

export interface VideoPreviewPlayInfo {
    category: string
    live_transcoding_task_list: LiveTranscodingTaskList[]
    meta: Meta
}

export interface LiveTranscodingTaskList {
    stage: string
    status: string
    template_height: number
    template_id: string
    template_name: string
    template_width: number
    url: string
}
