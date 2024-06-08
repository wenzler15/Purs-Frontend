import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Company/Login";
import RegisterCompany from "./Company/Register";
import ForgetPasswordCompany from "./Company/ForgetPassword";
import ResetCompanyPassword from "./Company/ResetPassword";
import Form1 from "./Lead/Register/Form1";
import Form2 from "./Lead/Register/Form2";
import UploadFile from "./Lead/UploadFile";
import ChartPage from "./ChartPage";
import LP from "./LP";
import ExportLink from "./ExportedUrl";
import Research from "./Research";
import NewLp from "./NewLP";
import NewResearch from "./NewResearch";
import RegisterCompanyStep1 from "./Company/Register/Page1";
import RegisterCompanyStep2 from "./Company/Register/Page2";
import CreateResearch from "./NewResearch";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NewLp />} />
                <Route path='/login' element={< Login />} />
                <Route path='/company/register' element={< RegisterCompany />} />
                <Route path='/company/register/step1' element={< RegisterCompanyStep1 />} />
                <Route path='/company/register/step2' element={< RegisterCompanyStep2 />} />
                <Route path='/company/forgetPassword' element={< ForgetPasswordCompany />} />
                <Route path='/company/resetPassword' element={< ResetCompanyPassword />} />
                {/* <Route path='/lead/register' element={<Form1 />} />
                <Route path='/lead/register2' element={<Form2 />} /> */}
                <Route path='/lead/uploadFile' element={<UploadFile />} />
                <Route path='/chart' element={<ChartPage />} />
                <Route path='/chartExport' element={<ExportLink />} />
                <Route path='/research' element={<Research />} />
                <Route path='/research/newResearch' element={<CreateResearch />} />
            </Routes>
        </Router>
    )
}