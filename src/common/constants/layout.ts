import type {OptionsType} from "@/types";

export const ROLE_NAME = [
    {id: 1, name: 'Administrator'},
    {id: 2, name: 'Operator'},
    {id: 3, name: 'Bendahara'},
    {id: 4, name: 'Pendaftar'},
]

export const COLOR = [
    "success", "danger", "warning", "info", "light", "dark", "primary", "secondary",
]

export const ROLE_INSTITUTION = [2, 3]

export const ROLE_OPTIONS: OptionsType[] = ROLE_NAME.map((item) : OptionsType => {
    return {value: item.id, label: item.name}
})