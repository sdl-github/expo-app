import {Obj} from "@/lib/types/obj";
import { proxy, useSnapshot } from 'valtio'

export enum Type {
    Fetching = 'fetching',
    Folder = 'folder', // Folder state
    File = 'file', // File state
}

type ISate = {
    path: string
    type: Type
    folders?: Obj[]
    obj?: Obj
}

export const objStore = proxy<ISate>({
    path: '/',
    type: Type.Fetching,
    folders: [],
    obj: {} as Obj
})
