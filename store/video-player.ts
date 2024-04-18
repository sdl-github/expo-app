import { proxy, useSnapshot } from 'valtio'
 
type ISate = {
    isFullscreen: boolean
}

export const videoPlayerStore = proxy<ISate>({
    isFullscreen: false,
})
