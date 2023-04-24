import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Company/Login";
import RegisterCompany from "./Company/Register";
import ForgetPasswordCompany from "./Company/ForgetPassword";
import ResetCompanyPassword from "./Company/ResetPassword";
import Form1 from "./Lead/Register/Form1";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={< Login />} />
                <Route path='/company/register' element={< RegisterCompany />} />
                <Route path='/company/forgetPassword' element={< ForgetPasswordCompany />} />
                <Route path='/company/resetPassword' element={< ResetCompanyPassword />} />
                <Route path='/lead/register' element={<Form1 />} />
            </Routes>
        </Router>
    )
}