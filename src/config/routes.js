import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "../App";
import NotFound from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import PostsPage from "../pages/PostsPage";
import useAuth from "../hooks/useAuth";

const Router = () => {
  const { isAuthenticated, userDetails } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Navigate to="/recents" />} />
          <Route
            path="/recents"
            element={
              <PostsPage
                title="Más recientes"
                params={{ sortByRecent: true, size: 10 }}
                canCreatePost
              />
            }
          />
          <Route
            path="/hot"
            element={
              <PostsPage
                title="Más relevantes"
                params={{ sortByLikes: true, size: 10 }}
              />
            }
          />
          <Route
            path="/old"
            element={
              <PostsPage
                title="Más antiguos"
                params={{ sortByOldest: true, size: 10 }}
              />
            }
          />
          <Route path="/user">
            {isAuthenticated ? (
              <>
                <Route path="" element={<UserPage />} />
                <Route
                  path="posts"
                  element={
                    <PostsPage
                      title={`Posts de ${userDetails.username}`}
                      params={{ size: 10 }}
                      getRowPostsByUser
                    />
                  }
                />
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
