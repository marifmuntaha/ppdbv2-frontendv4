import {useAuthContext} from "@/common/hooks/useAuthContext";
import {Navigate, Outlet} from "react-router";

const AdminRoute = () => {
    const {user} = useAuthContext()
    return (
        user?.role !== 1 ? <Navigate to={"/error/403"} /> : <Outlet/>
    )
}

export default AdminRoute