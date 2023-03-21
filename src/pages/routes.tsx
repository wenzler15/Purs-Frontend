import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={< Login/>}/>
            </Routes>
        </Router>
    )
}