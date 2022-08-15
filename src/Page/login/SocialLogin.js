import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { socialLogin } from "../../redux/feature/loginSlice";

const SocialLogin = () => {
  const { token } = useParams();
  const decoded = jwt_decode(token);
  
  const { email } = decoded;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(socialLogin(email));
    localStorage.setItem("token", `Bearer ${token}`);
    navigate("/");
  }, [dispatch,email, token, navigate]);

  return <div></div>;
};

export default SocialLogin;
