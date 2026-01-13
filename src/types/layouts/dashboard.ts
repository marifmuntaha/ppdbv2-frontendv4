import type {
    StudentAchievementType,
    StudentAddressType, StudentFileType,
    StudentOriginType,
    StudentParentType,
    StudentPersonalType,
    StudentProgramType, StudentVerificationType
} from "@/types";

export type DashboardStudentType = {
    personal: Partial<StudentPersonalType>
    parent: Partial<StudentParentType>
    address: Partial<StudentAddressType>
    program: Partial<StudentProgramType>
    origin: Partial<StudentOriginType>
    achievement?: Partial<StudentAchievementType>
    files: Partial<StudentFileType>
}

export type StudentTreasurerType = {
    name: string,
    birthPlace: string,
    birthDate: string,
    guardName: string,
    address: string,
    program: string,
    boarding: string,
    verification: Partial<StudentVerificationType>
}