import React, {useEffect, type ReactNode} from "react";
import {Routes, Route, useLocation, BrowserRouter} from "react-router-dom";
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
import Logout from "@/pages/auth/logout";
import Error404 from "@/pages/error/error404";
import Boarding from "@/pages/master/boarding";
import PhoneVerification from "@/pages/auth/phone-verification";
import Payment from "@/pages/payment";
import PaymentDetail from "@/pages/payment/detail"
import Product from "@/pages/master/product";
import AdminRoute from "@/router/adminRoute";
import User from "@/pages/user";
import Discount from "@/pages/master/discount";
import StudentPersonal from "@/pages/register/personal";
import StudentParent from "@/pages/register/parent";
import StudentAddress from "@/pages/register/address";
import StudentProgram from "@/pages/register/program";
import StudentOrigin from "@/pages/register/origin";
import StudentAchievement from "@/pages/register/achievement";
import StudentFile from "@/pages/register/file";
import Student from "@/pages/student";
import Invoice from "@/pages/invoice";

interface ScrollToTopProps {
    children: ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({children}) => {
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
                        <Route element={<WithSidebar/>}>
                            <Route element={<ProtectedRoute/>}>
                                <Route path='/dashboard' element={<Dashboard/>}/>
                                <Route element={<AdminRoute/>}>
                                    <Route path="/data-pengguna" element={<User/>}/>
                                </Route>
                                <Route path='/master-data/tahun-pelajaran' element={<Year/>}/>
                                <Route path='/master-data/program-boarding' element={<Boarding/>}/>
                                <Route path="/master-data/item-pembayaran" element={<Product/>}/>
                                <Route path="/master-data/item-potongan" element={<Discount/>}/>
                                <Route path='/lembaga/:id/detail' element={<InstitutionDetails/>}/>
                                <Route path='/lembaga/data-lembaga' element={<InstitutionList/>}/>
                                <Route path="/pendaftaran/data-pribadi" element={<StudentPersonal/>}/>
                                <Route path="/pendaftaran/data-orangtua" element={<StudentParent/>}/>
                                <Route path="/pendaftaran/data-tempat-tinggal" element={<StudentAddress/>}/>
                                <Route path="/pendaftaran/program-pilihan" element={<StudentProgram/>}/>
                                <Route path="/pendaftaran/data-sekolah-asal" element={<StudentOrigin/>}/>
                                <Route path="/pendaftaran/data-prestasi" element={<StudentAchievement/>}/>
                                <Route path="/pendaftaran/unggah-berkas" element={<StudentFile/>}/>
                                <Route path="/data-pendaftar" element={<Student/>}/>
                                <Route path="/data-tagihan" element={<Invoice/>}/>
                                <Route path="/pembayaran" element={<Payment/>}/>
                                <Route path="/pembayaran/:id/lihat" element={<PaymentDetail/>}/>
                            </Route>
                            <Route path='/' element={<Dashboard/>}/>
                        </Route>
                        <Route element={<NoSidebar/>}>
                            <Route path="/auth/masuk" element={<Login/>}/>
                            <Route path="/auth/buat-akun" element={<Register/>}/>
                            <Route path="/auth/lupa-sandi" element={<ForgetPassword/>}/>
                            <Route path="/auth/verifikasi" element={<PhoneVerification/>}/>
                            <Route element={<ProtectedRoute/>}>
                                <Route path="/auth/keluar" element={<Logout/>}/>
                            </Route>
                            <Route path="/error/403" element={<Error404/>}/>
                            <Route path="*" element={<Error404/>}/>
                        </Route>
                    </Route>
                </Routes>
            </ScrollToTop>
            <ToastContainer/>
        </BrowserRouter>
    );
};

export default Router;
