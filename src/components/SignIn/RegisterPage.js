import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import "./signin.css";
import config from "../../config";
import pic from "../../images/farmer1.png";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [userEmailId, setUserEmailId] = useState("");
  const [userMobileNo, setUserMobileNo] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [userType, setUserType] = useState("");

  const [nameErr, setNameErr] = useState();
  const [emailErr, setEmailErr] = useState();
  const [passErr, setPassErr] = useState();
  const [mobErr, setMobErr] = useState();
  const [cityErr, setCityErr] = useState();
  const [pinErr, setPinErr] = useState();
  const [stateErr, setStateErr] = useState();
  const [userErr, setUserErr] = useState();
  const [invalidErr, setInvalidErr] = useState("");

  const navigate = useNavigate();

  const nameregEx = /^[a-zA-Z]/gm;
  const emailregEx = /^[\a-zA-Z][\a-z0-9._\.]+@([\a-z]+\.)+[\a-z]{2,4}$/;
  const passwordregEx =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?|])(?=.*[a-zA-Z]).{8,}$/gm;
  const mobileregEx = /^[\d]{10}$/;
  const cityregEx = /^[a-zA-Z]/gm;
  const pincoderegEx = /^[\d]{6}$/;

  let nameValidation = nameregEx.test(userName);
  let emailValidation = emailregEx.test(userEmailId);
  let passwordValidation = passwordregEx.test(userPassword);
  let mobileValidation = mobileregEx.test(userMobileNo);
  let cityValidation = cityregEx.test(city);
  let pincodeValidation = pincoderegEx.test(pincode);
  let stateValidation = state.length === 0;
  let userValidation = userType.length === 0;

  const signup = () => {
    if (!nameValidation) {
      setNameErr("Please Enter Valid Name");
      return;
    } else if (!emailValidation) {
      setEmailErr("Please Enter Valid Email");
      return;
    } else if (!passwordValidation) {
      setPassErr(
        "A minimum 8 characters password contains a combination of uppercase, lowercase letter, number and special character are required."
      );
      return;
    } else if (!mobileValidation) {
      setMobErr("Invalid Mobile Number");
      return;
    } else if (!cityValidation) {
      setCityErr("Invalid City");
      return;
    } else if (!pincodeValidation) {
      setPinErr("Invalid Pincode");
      return;
    } else if (stateValidation) {
      setStateErr("Please select State");
      return;
    } else if (userValidation) {
      setUserErr("Please select User Type");
      return;
    }

    axios
      .post(config.serverURL + "/register", {
        userName,
        userEmailId,
        userPassword,
        userMobileNo,
        city,
        state,
        pincode,
        userType,
      })
      .then((response) => {
        const result = response.data;
        toast.success("Registered Successfully");
        navigate("/signin");
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  return (
    <>
      <div className="mainbody1">
        <div className="row">
          <div className="subbody1 col-md-8 ">
            <h1 className="Bigtitle text text-center">Registration</h1>

            <div className="row">
              <div className="col-md-6">
                <p className="paragraph text">
                  We cut out the middleman and get money directly into hands of
                  our farmers
                </p>
              </div>
              <div className="img-box1 col-md-6 float-end">
                <img src={pic} alt="" />
              </div>
            </div>
          </div>

          <div className="col-md-4 float-end">
            <h2 className="title text-center" style={{ marginTop: 25 }}>
              Registration Form
            </h2>
            <div className="row">
              <div className="form">
                <div className="mb-3">
                  <label htmlFor="" className="label-control">
                    Enter Full Name
                  </label>
                  <input
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                  />
                  {!nameValidation ? (
                    <div className="text-danger">{nameErr}</div>
                  ) : (
                    <div className="text-success"> </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="label-control">
                    Enter Email Id
                  </label>
                  <input
                    onChange={(e) => {
                      setUserEmailId(e.target.value);
                    }}
                    type="email"
                    className="form-control"
                  />
                  {!emailValidation ? (
                    <div className="text-danger">{emailErr}</div>
                  ) : (
                    <div className="text-success"> </div>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="" className="label-control">
                    Enter Password
                  </label>
                  <input
                    onChange={(e) => {
                      setUserPassword(e.target.value);
                    }}
                    type="password"
                    className="form-control"
                  />
                  {!passwordValidation ? (
                    <div className="text-danger">{passErr}</div>
                  ) : (
                    <div className="text-success"> </div>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="" className="label-control">
                    Enter Mobile Number
                  </label>
                  <input
                    maxLength={10}
                    onChange={(e) => {
                      setUserMobileNo(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                  />
                  {!mobileValidation ? (
                    <div className="text-danger">{mobErr}</div>
                  ) : (
                    <div className="text-success"> </div>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="" className="label-control">
                    City
                  </label>
                  <input
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                  />
                  {!cityValidation ? (
                    <div className="text-danger">{cityErr}</div>
                  ) : (
                    <div className="text-success"> </div>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="" className="label-control">
                    Enter Pincode
                  </label>
                  <input
                    maxLength={6}
                    onChange={(e) => {
                      setPincode(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                  />

                  {!pincodeValidation ? (
                    <div className="text-danger">{pinErr}</div>
                  ) : (
                    <div className="text-success"> </div>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor="" className="label-control">
                    Enter State
                  </label>
                  <select
                    onChange={(event) => {
                      setState(event.target.value);
                    }}
                    className="form-select"
                    id="validationCustom04"
                    required
                  >
                    <option defaultValue="">Choose...</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Assam">Assam</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                  {!stateValidation ? (
                    <div className="text-success"></div>
                  ) : (
                    <div className="text-danger">{stateErr} </div>
                  )}
                </div>

                <div className="mb-2" style={{ marginTop: 15 }}>
                  <label htmlFor="" className="label-control">
                    Select User Type
                  </label>
                  <select
                    onChange={(event) => {
                      setUserType(event.target.value);
                    }}
                    className="form-select"
                    id="validationCustom04"
                    required
                  >
                    <option defaultValue="">Choose...</option>
                    <option value="ROLE_FARMER">Farmer</option>
                    <option value="ROLE_BUYER">Buyer</option>
                  </select>
                  {!userValidation ? (
                    <div className="text-success"></div>
                  ) : (
                    <div className="text-danger">{userErr} </div>
                  )}
                  <div className="text-center text-danger">{invalidErr}</div>
                </div>

                <div className="mb-3" style={{ marginTop: 20 }}>
                  <button onClick={signup} className="btn btn-primary">
                    SignUp
                  </button>
                  <div className="float-end" style={{ marginTop: 10 }}>
                    Already Registered? <Link to="/signin">SignIn Here</Link>
                  </div>
                </div>
                <div className="mb-3 text-center" style={{ marginTop: 20 }}>
                  <Link to="/">Back to Homepage</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
