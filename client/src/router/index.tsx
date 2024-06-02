import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import Projects from "../screens/Projects";
import Login from "../screens/Login";
import ProtectedRoute from "./ProtectedRoute";
import Departments from "../screens/Departments";
import Employees from "../screens/Employees";
import Statistics from "../components/Statistics";
import TaskBoard from "../components/TaskBoard";

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
        element={<Statistics />} />
        <Route 
        path="projects" 
        element={<Projects />} />
        <Route 
        path="departments" 
        element={<Departments/>} />
        <Route 
        path="employees" 
        element={<Employees/>} />
        <Route 
        path="boards/:id"
        element={<TaskBoard/>} />
    </Route>
    
    {/* if no route  */}
    <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
};

export default MainRouter;