import React from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {PreviewCard} from "@/components";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {getRoleName} from "@/helpers";

const Treasurer = () => {
    const {user} = useAuthContext()
    return (
        <React.Fragment>
            <Head title="Dashboard" />
            <Content>
                <PreviewCard>
                    <h4>Selamat Datang, {user?.name}</h4>
                    <span className="text-muted">anda masuk sebagai {getRoleName(user?.role)}</span>
                </PreviewCard>
            </Content>
        </React.Fragment>
    )
}

export default Treasurer