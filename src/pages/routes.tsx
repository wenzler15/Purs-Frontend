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
import CreateResearch from "./NewResearch";
import RegisterCompanyStep1 from "./Company/Register/Page1";
import RegisterCompanyStep2 from "./Company/Register/Page2";
import Home from "./Home";
import Profile from "./Profiles/User";
import ProfileCompany from "./Profiles/Company";
import Employees from "./User/List";
import Groups from "./Group/List";
import Departments from "./Department/List";
import AddUpdateDepartment from "./Department/AddUpdate";
import Roles from "./Roles/List";
import AddUpdateRole from "./Roles/AddUpdate";
import ShowUpdateDepartment from "./Department/ShowUpdate";
import ShowUpdateRole from "./Roles/ShowUpdate";
import AddUpdateGroups from "./Group/AddUpdate";
import AddUpdateUser from "./User/AddUpdate";
import ShowUpdateUser from "./User/ShowUpdate";
import ShowUpdateGroups from "./Group/ShowUpdate";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Company routes */}
                <Route path='/company/register' element={< RegisterCompany />} />
                <Route path='/company/register/step1' element={< RegisterCompanyStep1 />} />
                <Route path='/company/register/step2' element={< RegisterCompanyStep2 />} />
                <Route path='/company/forgetPassword' element={< ForgetPasswordCompany />} />
                <Route path='/company/resetPassword' element={< ResetCompanyPassword />} />
                <Route path="/profileCompany"  element={<ProfileCompany />} />

                {/* User routes */}
                <Route path='/employees' element={<Employees />} />
                <Route path="/profile"  element={<Profile />} />
                <Route path="/employee/add" element={<AddUpdateUser />}/>
                <Route path="/employee/show" element={<ShowUpdateUser />}/>

                {/* Group routes */}
                <Route path='/groups' element={<Groups />} />
                <Route path='/group/add' element={<AddUpdateGroups />}/>
                <Route path='/group/show' element={<ShowUpdateGroups />} />

                {/* Department routes */}
                <Route path='/departments' element={<Departments />} />
                <Route path='/department/add' element={<AddUpdateDepartment />} />
                <Route path='/department/show' element={<ShowUpdateDepartment />} />

                <Route path='/roles' element={<Roles />} />
                <Route path='/role/add' element={<AddUpdateRole />} />
                <Route path='/role/show' element={<ShowUpdateRole />} />

                {/* Research routes */}
                <Route path='/research' element={<Research />} />
                <Route path='/research/:researchId' element={<CreateResearch />} />
                <Route path='/research/newResearch' element={<CreateResearch />} />

                {/* Other routes */}
                <Route path='/lead/uploadFile' element={<UploadFile />} />
                <Route path='/chart' element={<ChartPage />} />
                <Route path='/chartExport' element={<ExportLink />} />
                <Route path='/home' element={<Home />}/>
                <Route path="/" element={<NewLp />} />
                <Route path='/login' element={< Login />} />
                {/* <Route path='/lead/register' element={<Form1 />} />
                <Route path='/lead/register2' element={<Form2 />} /> */}
            </Routes>
        </Router>
    )
}