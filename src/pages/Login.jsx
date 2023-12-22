import React from "react";
import person_icon from "../components/assets/person.png";
import password_icon from "../components/assets/password.png";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:8000/user/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid username");
          } else {
            if (resp.password === password) {
              localStorage.setItem("username", username);
              localStorage.setItem("userrole", resp.role);
              if (resp.role === "admin") {
                toast.success("Success");
                usenavigate("/product");
              } else {
                toast.error("Kamu bukan admin");
              }
            } else {
              toast.error("Please Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  return (
    <form onSubmit={ProceedLogin}>
      <div className="con">
        <div className="header">
          <div className="text">Log In</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={person_icon} alt="" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => usernameupdate(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              value={password}
              onChange={(e) => passwordupdate(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="submit-container">
          <button className="submit" type="submit">
            Log In
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
