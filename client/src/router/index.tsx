import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import TaskBoard from "../components/TaskBoard";
import Projects from "../screens/Projects";
import Login from "../screens/Login";
import ProtectedRoute from "./ProtectedRoute";

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
        element={<h1>Departments</h1>} />
    </Route>
    
    {/* if no route  */}
    <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
};

export default MainRouter;