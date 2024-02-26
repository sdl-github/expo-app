import { useEffect, useState } from "react";
import { proxy, useSnapshot } from 'valtio'
import { getData, setData } from "../lib/storage";
import { SERVER_KEY, SERVER_LIST_KEY } from "../constants";
import Toast from 'react-native-toast-message';

interface Server {
    url: string;
    username?: string
    password?: string
}

interface IState {
    server: Server | undefined
    serverList: Server[]
}

export const store = proxy<IState>({
    server: undefined,
    serverList: []
})


export function useServer() {

    useEffect(() => {
        restoreServer()
    }, [])

    async function restoreServer() {
        const storeServer = await getData(SERVER_KEY)
        const storeServerList = await getData(SERVER_LIST_KEY)
        const item = storeServer || ((storeServerList && storeServerList.length) && storeServerList[0] || {})
        if (!store.server) {
            store.server = item
        }
        store.serverList = storeServerList
    }

    async function addServer(server: Server) {
        const storeServerList: Server[] = await getData(SERVER_LIST_KEY) || []
        if (storeServerList.some(item => item.url === server.url && item.username === server.username)) {
            Toast.show({
                type: 'error',
                text1: '服务器已存在',
                text2: '请检查服务器配置',
                visibilityTime: 3000,
                autoHide: true,
            });
            throw new Error()
        }
        storeServerList.push(server)
        await setData(SERVER_LIST_KEY, storeServerList)
        restoreServer()
    }

    async function setServer(server: Server) {
        store.server = server
        setData(SERVER_KEY, server)
    }

    async function delServer(server:Server) {
        const storeServerList:Server[] = await getData(SERVER_LIST_KEY)
        const index = storeServerList.findIndex(item => item.url === server.url && item.username === server.username)
        storeServerList.splice(index, 1)
        store.serverList = storeServerList
        await setData(SERVER_LIST_KEY, storeServerList)
    }

    return {
        store,
        addServer,
        setServer,
        delServer
    }

}