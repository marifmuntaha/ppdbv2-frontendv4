import {apiCore} from "@/common/api/core";
import type {ApiResponseInterface, StudentTreasurerType} from "@/types";

const api = new apiCore()

async function studentTreasurer(params: Record<string, any> = {}, notification: boolean = false): Promise<StudentTreasurerType[]|[]> {
    const baseUrl = '/student/treasurer';
    const result = await api.get<StudentTreasurerType[]>(baseUrl, params, notification)
        .then((value: ApiResponseInterface<StudentTreasurerType[]> ) => value.result);
    return result !== undefined ? result : [];
}

export {studentTreasurer};