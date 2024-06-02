import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import TaskBoard from "../components/TaskBoard";
import Projects from "../screens/Projects";
import Login from "../screens/Login";
import ProtectedRoute from "./ProtectedRoute";
import Departments from "../screens/Departments";
import Employees from "../screens/Employees";

const MainRouter = ({token}: {token: any}) => {
  return <Routes>
    <Route index element={<Login />} />

    <Route 
        path="dashboard" 
        element={
        <ProtectedRoute  isLoggedIn={!!token}>
            <Dashboard />
        </ProtectedRoute>
        } 
    >
        <Route 
        path="" 
        element={<TaskBoard/>} />
        <Route 
        path="projects" 
        element={<Projects />} />
        <Route 
        path="departments" 
        element={<Departments/>} />
        <Route 
        path="employees" 
        element={<Employees/>} />
    </Route>
    
    {/* if no route  */}
    <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
};

export default MainRouter;