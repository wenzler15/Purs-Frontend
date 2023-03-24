import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Company/Login";
import RegisterCompany from "./Company/Register";
import ForgetPasswordCompany from "./Company/ForgetPassword";
import ResetCompanyPassword from "./Company/ResetPassword";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={< Login />} />
                <Route path='/company/register' element={< RegisterCompany />} />
                <Route path='/company/forgetPassword' element={< ForgetPasswordCompany />} />
                <Route path='/company/resetPassword' element={< ResetCompanyPassword />} />
            </Routes>
        </Router>
    )
}