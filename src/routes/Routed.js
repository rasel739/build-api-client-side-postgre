import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Page/home/Home";
import Login from "../Page/login/Login";
import SocialLogin from "../Page/login/SocialLogin";
import Notfound from "../Page/notfound/Notfound";
import ResetPassword from "../Page/resetPassword/ResetPassword";
import Signup from "../Page/signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const Routed = () => {
  const { auth } = useSelector((state) => state.persistedReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute auth={auth}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/resetPassword/:email/:token"
          element={<ResetPassword />}
        />

        <Route path="/v1/:token" element={<SocialLogin />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routed;
