import {apiCore} from "@/common/api/core";
import type {ApiResponseInterface, DashboardStudentType} from "@/types";

const api = new apiCore()

async function studentStatus(params: Record<string, any> = {}, notification: boolean = false): Promise<DashboardStudentType|undefined> {
    const baseUrl = '/dashboard/student/status'
    const result = await api.get<DashboardStudentType>(baseUrl, params, notification)
        .then((value: ApiResponseInterface<DashboardStudentType> ) => value.result);
    return result !== undefined ? result : undefined;
}

async function studentCount(params: Record<string, any> = {}, notification: boolean = false): Promise<DashboardStudentType|undefined> {
    const baseUrl = '/dashboard/student/count'
    const result = await api.get<DashboardStudentType>(baseUrl, params, notification)
        .then((value: ApiResponseInterface<DashboardStudentType> ) => value.result);
    return result !== undefined ? result : undefined;
}

export {studentStatus, studentCount}