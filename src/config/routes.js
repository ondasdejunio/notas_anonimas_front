import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "../App";
import NotFound from "../pages/NotFoundPage";
import RecentsPage from "../pages/RecentsPage";
import RegisterPage from "../pages/register/RegisterPage";
import RelevantsPage from "../pages/RelevantsPage";
import OldestPage from "../pages/OldestPage";
import LoginPage from "../pages/login/LoginPage";
import UserPage from "../pages/UserPage";
import UserPostsPage from "../pages/UserPostsPage";
import useAuth from "../hooks/useAuth";

const Router = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Navigate to="/recents" />} />
          <Route path="/recents" element={<RecentsPage />} />
          <Route path="/hot" element={<RelevantsPage />} />
          <Route path="/old" element={<OldestPage />} />
          <Route path="/user">
            {isAuthenticated ? (
              <>
                <Route path="" element={<UserPage />} />
                <Route path="posts" element={<UserPostsPage />} />
              </>
            ) : (
              <>
                <Route path="" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </>
            )}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
