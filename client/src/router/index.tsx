import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import TaskBoard from "../components/TaskBoard";
// import Login from "../screens/Login";
// import Dashboard from "../screens/Dashboard";
// import ProtectedRoute from "./ProtectedRoute";
// import CustomersTable from "../components/CustomersTable";
// import ProductsTable from "../components/ProductsTable";
// import NewsTable from "../components/NewsTable";
// import TestimonialsTable from "../components/TestimonialsTable";
// import FaqTable from "../components/FaqTable";
// import StoreInfoTable from "../components/StoreInfoTable";

const MainRouter = () => {
  return <Routes>
    {/* <Route index element={<Dashboard />} /> */}

    <Route 
        path="dashboard" 
        element={
        // <ProtectedRoute>
            <Dashboard />
        // </ProtectedRoute>
        } 
    >
        
        <Route 
        path="" 
        element={<TaskBoard/>} />
        {/* <Route 
        path="store-info" 
        element={<StoreInfoTable/>} />
        <Route 
        path="products" 
        element={<ProductsTable/>} />
        <Route 
        path="news" 
        element={<NewsTable/>} />
        <Route 
        path="testimonials" 
        element={<TestimonialsTable/>} />
        <Route 
        path="faq" 
        element={<FaqTable/>} /> */}

    </Route>
    
    {/* if no route  */}
    <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
};

export default MainRouter;