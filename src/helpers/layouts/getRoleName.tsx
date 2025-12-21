import {ROLE_NAME} from "@/common/constants";

export const getRoleName = (id: string|undefined) => {
    const roleName =  ROLE_NAME.find((item) => {
        return item.id === id
    })
    return roleName?.name;
}