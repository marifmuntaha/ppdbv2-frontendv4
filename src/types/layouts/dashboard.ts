import type {
    StudentAddressType, StudentFileType,
    StudentOriginType,
    StudentParentType,
    StudentPersonalType,
    StudentProgramType
} from "@/types";

export type DashboardStudentType = {
    personal: Partial<StudentPersonalType>
    parent: Partial<StudentParentType>
    address: Partial<StudentAddressType>
    program: Partial<StudentProgramType>
    origin: Partial<StudentOriginType>
    files: Partial<StudentFileType>
}