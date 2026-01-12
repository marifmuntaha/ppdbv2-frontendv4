import React, {useEffect, useState} from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {useYearContext} from "@/common/hooks/useYearContext";
import {useInstitutionContext} from "@/common/hooks/useInstitutionContext";
import {get as getProgram} from "@/common/api/student/program";
import type {DashboardStudentType} from "@/types";

const Student = () => {
    const year = useYearContext()
    const institution = useInstitutionContext()
    const [students, setStudent] = useState<DashboardStudentType>()

    useEffect(() => {
        getProgram({yearId: year?.id, institutionId: institution?.id}).then((resp) => console.log(resp))
    }, []);
    return (
        <React.Fragment>
            <Head title="Data Pendaftar"/>
            <Content>
                Halaman Pendaftar
            </Content>
        </React.Fragment>
    )
}

export default Student;