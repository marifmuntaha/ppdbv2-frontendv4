import Router from "./router";
import {YearProvider} from "@/layout/provider/year";
import {AuthProvider} from "@/layout/provider/auth";

const App = () => {
    return (
        <YearProvider>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </YearProvider>
    );
};
export default App;