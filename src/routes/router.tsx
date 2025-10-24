import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/layout";
import env from "../lib/config/env";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            path: "/",
            element: <Navigate to={'/dashboard/overview'} />
         },
         {
            path: '/dashboard/overview',
            element: <div>Hello User</div>
         }
         // {
         //    path: '/users',
         //    element: <UserPage />
         // }
      ]
   },
], {basename: "/" + env.BASE_NAME})
