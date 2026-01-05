import {apiCore} from "@/common/api/core";
import type {ApiResponseInterface, InstitutionPeriodType} from "@/types";

const api = new apiCore()

async function get(params: Record<string, any> = {}, notification: boolean = false): Promise<InstitutionPeriodType[]> {
    const baseUrl = '/institution/period'
    const result = await api.get<InstitutionPeriodType[]>(baseUrl, params, notification)
        .then((value: ApiResponseInterface<InstitutionPeriodType[]>) => value.result);
    return result !== undefined ? result : [];
}

async function store(params: Record<string, any> = {}) {
    const baseUrl = '/institution/period'
    const result = await api.create<InstitutionPeriodType>(baseUrl, params, true)
        .then((resp) => resp.result)
    return result !== undefined ? result : undefined;
}

async function update(params: Record<string, any> = {}) {
    const baseUrl = `/institution/period/${params.id}`
    return await api.update<InstitutionPeriodType>(baseUrl, params, true)
        .then((resp) => resp.result);
}

async function destroy(id: number | undefined) {
    const baseUrl = `/institution/period/${id}`
    return await api.delete(baseUrl, true).then((resp) => resp);
}

export {get, store, update, destroy}
