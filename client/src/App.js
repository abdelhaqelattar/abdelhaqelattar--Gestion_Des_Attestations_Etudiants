import React, { useState, useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { useAuth } from "./Shared/Hooks/AuthHook";
import { AuthContext } from "./Shared/Context/AuthContext";
import { RouteContext } from "./Shared/Context/RoutesContext";

import History from "./Pages/History";
import Claims from "./Pages/Claims";
import Requests from "./Pages/Requests";
import Auth from "./Auth/Pages/Auth";
import Layout from "./Shared/Layouts/Layout";
import Dashboard from "./Dashboard/Dashboard";
import ModalFormExemple from "./Test/ModalFormExemple";
import StudentForm from "./StudentForm/Pages/StudentForm";
import AttestationScolarite from "./Pages/AttestationScolarite";
import ConventionStage from "./Pages/ConventionStage";
import ReleveNotes from "./Pages/ReleveNotes";
import AttestationReussite from "./Pages/AttestationReussite";

const routes = [
  // {
  //   path: "/",
  //   element: <h1>Test</h1>,
  //   errorElement: <h1>Not Found</h1>,
  // },
  {
    path: "/requests",
    element: <StudentForm />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <Navigate to="/requests" />,
  },
];
const router = createBrowserRouter(routes);

const flattenRoutes = (routes) => {
  let flatRoutes = [];

  routes.forEach((route) => {
    flatRoutes.push(route);

    if (route.children) {
      route.children.forEach((childRoute) => {
        // Prepend the parent path to the child path
        const fullPath = route.path + "/" + childRoute.path;
        flatRoutes.push({ ...childRoute, path: fullPath });
      });
    }
  });

  return flatRoutes;
};

// Flatten your routes
function App() {
  const { token, login, logout, userId } = useAuth();
  const [docTypes, setDocTypes] = useState([]);
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
      fetch("http://127.0.0.1:5000/docTypes", {
        method: "GET", // or "POST" or other HTTP methods depending on your server
        headers: {
          "Content-Type": "application/json",
          // You might need additional headers depending on your server requirements
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setDocTypes(data.docTypes);
        })
        .catch((error) => {
          console.error("Error during fetch:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the fetch is complete
        });
    },[]);

  const docTypeMenu = docTypes.map((ele) => {
    return {
      pageTitle: ele.title,
      path: ele.link,
      element: <Requests />,
    };
  });

  const authRoutes = [
    {
      path: "/requests",
      element: <StudentForm />,
    },
    {
      pageTitle: "Dashboard",
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          pageTitle: "Reclamations",
          path: "reclamations",
          element: <Claims />,
        },
        {
          pageTitle: "Historique",
          path: "historique",
          element: <History />,
        },
        ...docTypeMenu,
      ],
    },
    {
      path: "/modal",
      element: <ModalFormExemple action="read" />,
    },
    {
      path: "*",
      element: <Navigate to="/dashboard" />,
    },
  ];
  const authRouter = createBrowserRouter(authRoutes);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <RouteContext.Provider
        value={{
          routes: flattenRoutes(routes),
          authRoutes: flattenRoutes(authRoutes),
          docTypes: docTypes,
        }}
      >
        {!isLoading && <RouterProvider router={token ? authRouter : router} />}
      </RouteContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
