import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Company/Login";
import RegisterCompany from "./Company/Register";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={< Login />} />
                <Route path='/company/register' element={< RegisterCompany />} />
            </Routes>
        </Router>
    )
}