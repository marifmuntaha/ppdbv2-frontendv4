import {apiCore} from "@/common/api/core";
import type {YearType} from "@/types";

const api = new apiCore()

async function year(params: Record<string, any> = {}, notification: boolean = false): Promise<YearType|undefined> {
    const baseUrl = 'public/year'
    return await api.get<YearType>(baseUrl, params, notification)
        .then((resp) => {
            return resp.result
        });
}

export {year}