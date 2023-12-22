import "./App.css";
import { ToastContainer } from "react-toastify";
import "./style/landingPage.css";
import React, { lazy, Fragment } from "react";
import PrivateRoute from "./service/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Login = lazy(() => import("./pages/Login"));
const Products = lazy(() => import("./pages/Products"));
const DetailProduct = lazy(() => import("./pages/DetailProduct"));
const Categories = lazy(() => import("./pages/Categories"));
const Movie = lazy(() => import("./pages/Movie"));
const NowPlaying = lazy(() => import("./pages/NowPlaying"));
const DetailMovie = lazy(() => import("./pages/DetailMovie"));

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-right"></ToastContainer>
      <React.Suspense fallback={<BeatLoader color="#36d7b7"/>}>
        <Router>
          <Fragment>
            <Routes>
              <Route exact path="/" element={<Movie />} />
              <Route exact path="/detail-movie/:id" element={<DetailMovie />} />
              <Route exact path="/now-playing" element={<NowPlaying />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/product" element={<PrivateRoute />}>
                <Route exact path="/product" element={<Products />} />
              </Route>
              <Route exact path="/category" element={<PrivateRoute />}>
                <Route exact path="/category" element={<Categories />} />
              </Route>
            </Routes>
          </Fragment>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
