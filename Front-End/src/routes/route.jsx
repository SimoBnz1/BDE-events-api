import { createBrowserRouter } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { Home } from "../components/Home";
import { Login } from "../components/Login";
import { NotFound } from "../components/NotFound";
import { AdminDash } from "../components/Admin/AdminDash";

export const router = createBrowserRouter([
  {
    element: <Sidebar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
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