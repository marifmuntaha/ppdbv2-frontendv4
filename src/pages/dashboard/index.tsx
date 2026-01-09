import {useAuthContext} from "@/common/hooks/useAuthContext";
import Administrator from "@/pages/dashboard/partials/administrator";
import Treasurer from "@/pages/dashboard/partials/treasurer";
import Student from "@/pages/dashboard/partials/student";

const Dashboard = () => {
    const {user} = useAuthContext()
    switch (user?.role) {
        case '1':
            return <Administrator />
        case '3':
            return <Treasurer />
        case '4':
            return <Student />
        default:
            return "Halaman Dashboard"
    }
}
export default Dashboard;