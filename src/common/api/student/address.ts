import {apiCore} from "@/common/api/core";
import type {ApiResponseInterface, StudentAddressType} from "@/types";

const api = new apiCore()

async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<StudentAddressType[]> {
    const baseUrl = '/student/address'
    const result = await api.get<StudentAddressType[]>(baseUrl, params, notification)
        .then((value: ApiResponseInterface<StudentAddressType[]>) => value.result);
    return result !== undefined ? result : [];
}

async function store(params: Record<string, any> = {}) {
    const baseUrl = '/student/address'
    const result = await api.create<StudentAddressType>(baseUrl, params, true)
        .then((resp) => resp.result)
    return result !== undefined ? result : undefined;
}

async function update(params: Record<string, any> = {}) {
    const baseUrl = `/student/address/${params.id}`
    return await api.update<StudentAddressType>(baseUrl, params, true)
        .then((resp) => resp.result);
}

async function destroy(id: number | undefined) {
    const baseUrl = `/student/address/${id}`
    return await api.delete(baseUrl, true).then((resp) => resp);
}

export {get, store, update, destroy}
