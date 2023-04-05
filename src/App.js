//import "./App.css";
//import createBrowserRouter
import { createBrowserRouter,RouterProvider } from "react-router-dom";

//import components
import RootLayout from './components/rootlayout/RootLayOut';
import ErrorPage from './components/errorpage/ErrorPage'
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import ResetPassword from './components/resetpassword/ResetPassword';
import GdoDashBoard from "./components/dashboard/GdoDashBoard";
import AdminDashBoard from "./components/dashboard/AdminDashBoard";
import Projects from "./components/projects/Projects";
import AdminProjects from "./components/projects/AdminProjects";
import SuperAdmin from "./components/superadmin/SuperAdmin";
import CreateProject from "./components/admin/CreateProject";
import ProjectDetailsById from "./components/projects/ProjectDetailsById"
import CreateUpdate from "./components/projectmanager/CreateUpdate";
import ProjectManagerDashBoard from "./components/dashboard/ProjectManagerDashBoard";
import AssignProjectToEmployee from "./components/gdo/AssignProjectToEmployee";
import RaiseResource from "./components/gdo/RaiseResource";
import RaiseConcern from "./components/projectmanager/RaiseConcern";
import ProjectUpdates from "./components/admin/ProjectUpdates";
import Concerns from "./components/admin/GetConcerns";

function App() {
  //create BrowserRouter Object
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // Connecting Error Page
      errorElement: <ErrorPage />,
      // Connecting Children
      children: [
        { path: "/", element: <Home /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword />},
        { path: "reset-password", element: <ResetPassword/>},
        { path: "gdo-dashboard/:email", element: <GdoDashBoard/>},
        { path: "admin-dashboard/:email", element: <AdminDashBoard/>},
        { path: "admin-create-project", element: <CreateProject/>},
        { path: "gdo-projects", element: <Projects/>},
        { path: "admin-projects", element: <AdminProjects/>},
        { path: "super-admin", element: <SuperAdmin/>},
        { path: "projectDetails-byProjectId/:project_id", element: <ProjectDetailsById/>},
        { path: "create-update", element: <CreateUpdate/>},
        { path: "projectManager-dashboard/:email", element: <ProjectManagerDashBoard/>},
        { path: "assignProjectToEmployee", element: <AssignProjectToEmployee/>},
        { path: "raise-resource", element: <RaiseResource/>},
        { path: "raise-concern/:email", element: <RaiseConcern/>},
        { path: "project-updates", element: <ProjectUpdates/>},
        { path: "project-concerns", element: <Concerns/>},

      ],
    },
  ]);

  return (
    <div>
      {/* Provide to app react-route-dom provieds RouterProvider */}
      <RouterProvider router={browserRouterObj} />{" "}
    </div>
  );
}

export default App;