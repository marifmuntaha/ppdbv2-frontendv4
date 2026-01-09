import React from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {PreviewCard} from "@/components";

const Student = () => {
    return (
        <React.Fragment>
            <Head title="Dashboard" />
            <Content>
                <PreviewCard>
                    Selamat Datang
                </PreviewCard>
            </Content>
        </React.Fragment>
    )
}

export default Student