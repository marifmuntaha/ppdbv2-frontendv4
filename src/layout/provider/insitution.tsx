import {type ReactNode, useEffect, useState} from "react";
import type {InstitutionType} from "@/types";
import {show as showInstitution} from "@/common/api/institution"
import { InstitutionContext } from "@/common/hooks/useInstitutionContext";
import {Loading} from "@/components";
import {useAuthContext} from "@/common/hooks/useAuthContext";

export const InstitutionProvider = ({children} : {children: ReactNode}) => {
    const {user} = useAuthContext()
    const [loading, setLoading] = useState(true)
    const [institution, setInstitution] = useState<InstitutionType>()

    useEffect(() => {
        const fetchYear = async () => {
            try {
                await showInstitution({id: user?.institutionId}).then((resp) => {
                    setInstitution(resp)
                })
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchYear()
    }, [loading]);

    if (loading) return <Loading/>

    return (
        <InstitutionContext.Provider value={institution}>
            {children}
        </InstitutionContext.Provider>
    )
}