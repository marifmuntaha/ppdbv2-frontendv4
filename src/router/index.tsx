import React, { useEffect, type ReactNode } from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import ThemeProvider from "@/layout/provider/theme";
import {NoSidebar, WithSidebar} from '@/layout';
import Dashboard from '@/pages/dashboard';
import ProtectedRoute from "@/router/protectedRoute";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import {ToastContainer} from "react-toastify";
import ForgetPassword from "@/pages/auth/forget-password";
import Year from "@/pages/master/year";
import InstitutionList from "@/pages/institution/list";
import InstitutionDetails from "@/pages/institution/detail";

interface ScrollToTopProps {
    children: ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{children}</>;
};

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    <Route element={<ThemeProvider/>}>
                        <Route element={<WithSidebar />}>
                            <Route element={<ProtectedRoute />}>
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/master-data/tahun-pelajaran' element={<Year />} />
                                <Route path='/lembaga/:id/detail' element={<InstitutionDetails/>}/>
                                <Route path='/lembaga/data-lembaga' element={<InstitutionList />} />
                            </Route>
                        </Route>
                        <Route element={<NoSidebar/>}>
                            <Route path="/auth/masuk" element={<Login />} />
                            <Route path="/auth/buat-akun" element={<Register />} />
                            <Route path="/auth/lupa-sandi" element={<ForgetPassword />} />
                        </Route>
                    </Route>
                </Routes>
            </ScrollToTop>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default Router;
