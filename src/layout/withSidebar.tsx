import React from "react";
import { Outlet } from "react-router-dom";
import {menuDefault, menuAdmin, menuStudent} from "./sidebar/MenuData";
import Sidebar from "./sidebar";
import Head from "./head";
import Header from "./header";
import Footer from "./footer";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import {useAuthContext} from "@/common/hooks/useAuthContext";

export const WithSidebar = ({ title } : {title?:string}) => {
    const {user} = useAuthContext()
    const mainmenu = () => {
        switch (user?.role) {
            case "1":
                return menuAdmin
            case "4":
                return menuStudent
            default:
                return menuDefault
        }
    }
    return (
        <React.Fragment>
            <Head title={!title ? 'Loading' : title} />
            <AppRoot>
                <AppMain>
                    <Sidebar menuData={mainmenu()} fixed />
                    <AppWrap>
                        <Header fixed />
                        <Outlet />
                        <Footer />
                    </AppWrap>
                </AppMain>
            </AppRoot>
        </React.Fragment>
    );
};
