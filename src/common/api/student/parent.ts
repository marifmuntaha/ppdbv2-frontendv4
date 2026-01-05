import {apiCore} from "@/common/api/core";
import type {ApiResponseInterface, StudentParentType} from "@/types";

const api = new apiCore()

async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<StudentParentType[]> {
    const baseUrl = '/student/parent'
    const result = await api.get<StudentParentType[]>(baseUrl, params, notification)
        .then((value: ApiResponseInterface<StudentParentType[]>) => value.result);
    return result !== undefined ? result : [];
}

async function store(params: Record<string, any> = {}) {
    const baseUrl = '/student/parent'
    const result = await api.create<StudentParentType>(baseUrl, params, true)
        .then((resp) => resp.result)
    return result !== undefined ? result : undefined;
}

async function update(params: Record<string, any> = {}) {
    const baseUrl = `/student/parent/${params.id}`
    return await api.update<StudentParentType>(baseUrl, params, true)
        .then((resp) => resp.result);
}

async function destroy(id: number | undefined) {
    const baseUrl = `/student/parent/${id}`
    return await api.delete(baseUrl, true).then((resp) => resp);
}

export {get, store, update, destroy}
