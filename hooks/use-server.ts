import { useEffect, useState } from "react";
import { proxy, useSnapshot } from 'valtio'
import { getData, setData } from "../lib/storage";
import { SERVER_KEY, SERVER_LIST_KEY } from "../constants";

interface Server {
    url: string;
    username?: string
    password?: string
    token?: string
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
            throw new Error()
        }
        storeServerList.push(server)
        await setData(SERVER_LIST_KEY, storeServerList)
        await restoreServer()
    }

    async function setServer(server: Server) {
        store.server = server
        await setData(SERVER_KEY, server)
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