import {apiCore} from "@/common/api/core";
import type {ApiResponseInterface, UserType} from "@/types";

const api = new apiCore()

async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<UserType[]> {
    const baseUrl = '/user'
    const result = await api.get<UserType[]>(baseUrl, params, notification)
        .then((value: ApiResponseInterface<UserType[]> ) => value.result);
    console.log(result);
    return result !== undefined ? result : [];
}

async function store(params: Record<string, any> = {}) {
    const baseUrl = '/user'
    return await api.create<UserType>(baseUrl, params, true)
        .then((resp) => resp.result)
}

async function update(params: Record<string, any> = {}) {
    const baseUrl = `/user/${params.id}`
    return await api.update<UserType>(baseUrl, params, true).then((resp) => resp);
}

async function destroy(id: number|undefined) {
    const baseUrl = `/user/${id}`
    return await api.delete(baseUrl, true).then((resp) => resp);
}

export {get, store, update, destroy}
