import type {BoardingType, InstitutionPeriodType, InstitutionProgramType, InstitutionType, OptionsType} from "@/types";

export type StudentPersonalType = {
    id?: number
    userId?: number;
    name: string
    nisn?: string
    nik: string
    gender: string|undefined
    birthPlace: string
    birthDate: string
    phone: string
    birthNumber: string
    sibling: string
    createdBy?: number
    updatedBy?: number
}

export type StudentPersonalFormType = {
    id?: number
    name: string
    nisn?: string
    nik: string
    gender: OptionsType|undefined
    birthPlace: string
    birthDate: Date
    phone: string
    birthNumber: string
    sibling: string
}

export type StudentParentType = {
    id?: number
    userId?: number
    numberKk: string
    headFamily: string
    fatherStatus: string|undefined
    fatherName: string
    fatherNik: string
    fatherBirthPlace: string
    fatherBirthDate: string
    fatherStudy: string|undefined
    fatherJob: string|undefined
    fatherPhone: string
    motherStatus: string|undefined
    motherName: string
    motherNik: string
    motherBirthPlace: string
    motherBirthDate: string
    motherStudy: string|undefined
    motherJob: string|undefined
    motherPhone: string
    guardStatus: string|undefined
    guardName: string
    guardNik: string
    guardBirthPlace: string
    guardBirthDate: string
    guardStudy: string|undefined
    guardJob: string|undefined
    guardPhone: string
}


export type StudentParentFormType = {
    id?: number
    numberKk: string
    headFamily: string
    fatherStatus: OptionsType|undefined
    fatherName: string
    fatherNik: string
    fatherBirthPlace: string
    fatherBirthDate: Date
    fatherStudy: OptionsType|undefined
    fatherJob: OptionsType|undefined
    fatherPhone: string
    motherStatus: OptionsType|undefined
    motherName: string
    motherNik: string
    motherBirthPlace: string
    motherBirthDate: Date
    motherStudy: OptionsType|undefined
    motherJob: OptionsType|undefined
    motherPhone: string
    guardStatus: OptionsType|undefined
    guardName: string
    guardNik: string
    guardBirthPlace: string
    guardBirthDate: Date
    guardStudy: OptionsType|undefined
    guardJob: OptionsType|undefined
    guardPhone: string
}

export type StudentAddressType = {
    id?: number
    userId?: number
    province: string
    city: string
    district: string
    village: string
    street: string
    rt: string
    rw: string
    postal: string
    createdBy?: string
    updatedBy?: string
}

export type StudentAddressFormType = {
    id?: number
    province: OptionsType
    city: OptionsType
    district: OptionsType
    village: OptionsType
    street: string
    rt: string
    rw: string
    postal: string
}

export type StudentProgramType = {
    id?: number
    userId?: number
    yearId?: number
    institutionId?: string
    periodId?: number
    programId?: string
    boardingId?: string
    institution?: InstitutionType
    period?: InstitutionPeriodType
    program?: InstitutionProgramType
    boarding?: BoardingType
    createdBy?: string
    updatedBy?: string
    created_at?: string
    updated_at?: string
}

export type StudentOriginType = {
    id?: number
    userId?: number
    name: string
    npsn: string
    address: string
    createdBy?: string
    updatedBy?: string
}

export type StudentAchievementType = {
    id?: number
    yearId?: number
    userId?: number
    level: string
    champ: string
    type: string
    name: string
    file: string
    image?: any
    createdBy?: string
    updatedBy?: string
}

export type StudentFileType = {
    id?: number
    userId?: number
    fileKk: string
    fileKtp: string
    numberAkta: string
    fileAkta: string
    numberIjazah: string
    fileIjazah: string
    numberSkl: string
    fileSkl: string
    numberKip: string
    fileKip: string
    createdBy?: string
    updatedBy?: string
}

export type StudentFileFormType = {
    id?: number
    userId?: number
    imageKk: any
    imageKtp: any
    numberAkta: string
    imageAkta: any
    numberIjazah: string
    imageIjazah: any
    numberSkl: string
    imageSkl: any
    numberKip: string
    imageKip: any
}