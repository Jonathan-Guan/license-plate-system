import { useState } from "react";
import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import PassPage from "./pages/PassPage";
import EditPassPage, { passLoader } from "./pages/EditPassPage";
import AddPassPage from "./pages/AddPassPage";
import MainLayout from "./layouts/MainLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./index.css";

function getToken() {
  return localStorage.getItem("token");
}

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/passes" element={<PassPage />} />
          <Route
            path="/edit_pass/:id"
            loader={passLoader}
            element={<EditPassPage />}
          />
          <Route path="/add_pass" element={<AddPassPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
export { getToken };
