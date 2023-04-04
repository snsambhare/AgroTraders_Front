import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./signin.css";
import { Button } from "reactstrap";
import { URL } from "../../config";
import pic from "../../images/farmer.png";
import { FaSignInAlt } from "react-icons/fa";

const Signin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [invalidErr, setInvalidErr] = useState("");
  const navigate = useNavigate();

  const emailregEx = /^[\a-zA-Z][\a-z0-9._\.]+@([\a-z]+\.)+[\a-z]{2,4}$/;
  const passwordregEx =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?|])(?=.*[a-zA-Z]).{8,}$/gm;

  let emailValidation = emailregEx.test(email);
  let passwordValidation = passwordregEx.test(password);

  const signinUser = () => {
    if (!emailValidation) {
      return setEmailErr("Please Enter Valid Email");
    } else if (!passwordValidation) {
      return setPassErr("Invalid Password");
    } else {
      const body = {
        email,
        password,
      };

      const url = `${URL}/token`;

      axios.post(url, body).then(async (response) => {
        console.log(response.data);

        sessionStorage.setItem("userToken", response.data.token);

        if (response.data.token != null) {
          const response1 = await axios.get(`${URL}/getuserbyemail/${email}`);
          console.log(response1);
          if (
            response1.data.userType === "ROLE_ADMIN" ||
            response1.data.userType === "ROLE_FARMER" ||
            response1.data.userType === "ROLE_BUYER"
          ) {
            toast.success("Welcome to the AgroTraders");

            const { userId, userEmailId, userType, userName } = response1.data;

            sessionStorage["userId"] = userId;
            sessionStorage["userName"] = userName;
            sessionStorage["userEmailId"] = userEmailId;
            sessionStorage["userType"] = userType;
            sessionStorage["loginStatus"] = 1;

            navigate("/dash");
          } else {
            toast.error("Invalid email or password or user not found");
            navigate("/signin");
            return setInvalidErr("Invalid email or password or user not found");
          }
        }
      });
    }
  };

  return (
    <>
      <div className="mainbody1">
        <div className="row ">
          <div className="subbody1 col-md-8 ">
            <h1 className="Bigtitle text text-center">
              WELCOME TO AGROTRADERS
            </h1>

            <div className="row">
              <div className="col-md-6">
                <p className="paragraph text">
                  A new Perspective, Improving Agriculture, Improving Lives;
                  Bringing Growth in Agriculture.
                </p>
              </div>
              <div className="img-box1 col-md-6 float-end">
                <img src={pic} alt="" />
              </div>
            </div>
          </div>

          <div className="signin1 col-md-4 ">
            <div className="form">
              <div
                className="title text-center"
                style={{ marginTop: 30, fontSize: "2em" }}
              >
                {" "}
                <FaSignInAlt fontSize="1.5em" />
                <h2> Signin</h2>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className="form-control"
                />
                {!emailValidation ? (
                  <div className="text-danger">{emailErr}</div>
                ) : (
                  <div className="text-success"> </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="form-control"
                ></input>
                {!passwordValidation ? (
                  <div className="text-danger">{passErr}</div>
                ) : (
                  <div className="text-success"> </div>
                )}
              </div>

              <div className="mb-3">
                <div style={{ color: "red", textAlign: "center" }}>
                  <Link to="/ForgetPassword">Forgot Password?</Link>
                </div>
                <br />
                <Button
                  color="primary"
                  size="lg"
                  onClick={signinUser}
                  className="btn btn-primary"
                >
                  Signin
                </Button>
                <div className="float-end">
                  Don't have an account?{" "}
                  <Link to="/registerPage">SignUp Here</Link>
                </div>
                <Button
                  color="info"
                  size="lg"
                  className="mx-2"
                  onClick={() => {
                    navigate(`/`);
                  }}
                >
                  Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
