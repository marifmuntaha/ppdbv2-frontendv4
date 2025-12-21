import type {OptionsType} from "@/types";

export type YearType = {
    id?: number,
    name: string,
    description?: string,
    active: '1'|'2'|string|undefined,
    createdBy?: number
    updatedBy?: number
}

export type YearFormType = {
    id?: number | undefined,
    name: string,
    description?: string,
    active?: OptionsType | undefined
}