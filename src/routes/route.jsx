import { createBrowserRouter } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { Home } from "../components/Home";
import { Login } from "../components/Login";
import { NotFound } from "../components/NotFound";
import { AdminDash } from "../components/Admin/AdminDash";
import { Events } from "../components/Admin/Events";
import { AddEvent } from "../components/Admin/AddEvents";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
   {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  
    {
    
    element: <Sidebar />,
    children: [
      
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/addevents",
        element: <AddEvent />,
      },
      
      {
        path: "/adminDashboard",
        element: <AdminDash />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);