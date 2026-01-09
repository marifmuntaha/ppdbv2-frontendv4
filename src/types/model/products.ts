import type {OptionsType} from "@/types";

export type ProductType = {
    id?: number;
    yearId?: number;
    institutionId?: number;
    name: string;
    surname: string;
    price: string;
    gender: string;
    program: string;
    boarding: string;
    createdBy?: number;
    updatedBy?: number;
}

export type ProductFormType = {
    id?: number;
    yearId: number;
    institutionId: number;
    name: string;
    surname: string;
    price: string;
    gender: OptionsType[];
    program: OptionsType[];
    boarding: OptionsType[];
    monthly: OptionsType;
    createdBy?: number;
    updatedBy?: number;
}