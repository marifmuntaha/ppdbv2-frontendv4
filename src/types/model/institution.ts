import type {YearType} from "@/types";

export type InstitutionType = {
    id: number|undefined;
    name: string,
    surname: string,
    tagline: string,
    npsn: string,
    nsm: string,
    address: string,
    phone: string,
    email: string,
    website: string,
    head: string,
    logo?: string,
    image?: any
    createdBy?: number,
    updatedBy?: number,
}

export type InstitutionFormType = {
    id?: number|undefined;
    name: string,
    surname: string,
    tagline: string,
    npsn: string,
    nsm: string,
    address: string,
    phone: string,
    email: string,
    website: string,
    head: string,
    logo?: any,
}

export type InstitutionActivityType = {
    id?: number|undefined;
    yearId: number|undefined;
    institutionId: string|undefined;
    capacity: string,
    brochure: any,
    createdBy?: number|undefined,
    updatedBy?: number|undefined,
    year?: YearType|undefined,
    institution?: InstitutionType|undefined,
}

export type InstitutionActivityFormType = {
    id?: number|undefined;
    yearId: number|undefined;
    institutionId: number|undefined;
    capacity: string,
    brochure: string
}