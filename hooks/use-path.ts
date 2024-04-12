import { router, useGlobalSearchParams } from 'expo-router'
import { useServer } from "./use-server";
import { useEffect } from "react";
import { objStore, Type } from "@/store/obj";
import { useSnapshot } from "valtio";
import { Obj } from '@/lib/types/obj';

export function usePath() {
    const { store } = useServer()
    const objState = useSnapshot(objStore)
    const params = useGlobalSearchParams();

    useEffect(() => {
        const path = (params.path as string) || '/'
        const type = (params.type || Type.Folder) as Type
        objStore.path = path
        objStore.type = type
    }, [store.server, params])

    function backToLast() {
        const path = objState.path
        const arr = path.split('/').filter(item => !!item)
        const lastPathArr = arr.slice()
        lastPathArr.pop()
        const lastPath = lastPathArr ? `/${lastPathArr.join('/')}` : '/'
        const url = `/?path=${lastPath}&type=${Type.Folder}`
        router.navigate(url)
    }

    function goToPath(item: Obj) {
        const type = item?.is_dir ? Type.Folder : Type.File
        const path = `${objState.path}${!objState.path.endsWith('/') && '/' || ''}${item?.name}`
        const url = `/?path=${path}&type=${type}`
        router.navigate(url)
    }
    return {
        backToLast,
        goToPath
    }
}