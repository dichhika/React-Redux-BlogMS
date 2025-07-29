import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
import Protected from "./Protected";
import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Lazy-loaded components
const Home = lazy(() => import("./pages/blog/Home"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const AddBlog = lazy(() => import("./pages/blog/AddBlog"));
const EditBlog = lazy(() => import("./pages/blog/EditBlog"));
const SingleBlog = lazy(() => import("./pages/blog/SingleBlog"));

// Fallback UI for error boundary
function ErrorFallBackBoundary({ error }) {
  return (
    <div>
      <h2>Something went wrong...</h2>
      <p>{error?.message}</p>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallBackBoundary}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/blog/add" element={<AddBlog />} />
              <Route path="/blog/edit/:id" element={<EditBlog />} />
              <Route
                path="/blog/:id"
                element={
                  <Protected>
                    <SingleBlog />
                  </Protected>
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
