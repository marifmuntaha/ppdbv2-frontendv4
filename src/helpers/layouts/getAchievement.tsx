import {CHAMP_ACHIEVEMENT_OPTIONS, LEVEL_ACHIEVEMENT_OPTIONS, TYPE_ACHIEVEMENT_OPTIONS} from "@/common/constants";

export const achievementLevel = (value: string) => {
    const level = LEVEL_ACHIEVEMENT_OPTIONS.find((item) => item.value === value)
    return level?.label
}

export const achievementChamp = (value: string) => {
    const champ = CHAMP_ACHIEVEMENT_OPTIONS.find((item) => item.value === value)
    return champ?.label
}

export const achievementType = (value: string) => {
    const type = TYPE_ACHIEVEMENT_OPTIONS.find((item) => item.value === value)
    return type?.label
}