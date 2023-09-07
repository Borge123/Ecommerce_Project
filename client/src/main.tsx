import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from "./routes/public/PublicRoutes";
import { adminRoutes } from "./routes/admin/AdminRoutes";
const router = createBrowserRouter([...publicRoutes, ...adminRoutes]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
