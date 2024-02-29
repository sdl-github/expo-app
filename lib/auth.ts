import {getData, removeData, setData} from "@/lib/storage";

const TokenKey = 'Server-Token'

export async function getToken() {
    return await getData(TokenKey)
}

export async function setToken(token: string) {
    return await setData(TokenKey, token)
}

export async function removeToken() {
    return await removeData(TokenKey)
}