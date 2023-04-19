import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { FacebookSignFunction, signinFunction, signupFunction } from "../Server/server";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';


export default function CredentialsScreen() {
  const navigate = useNavigate();
  const [displayLoginCredentials, setdisplayLoginCredentials] = useState(true);
  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  async function login() {
    if (state.email.length > 0 && state.password.length > 0) {
      let dash = await signinFunction(state)
      if (dash === true) {
        navigate("/user/Dashbaord")
      }
    } else {
      alert("User credentials is not valid")
    }
  }

  function register() {
    if (state.password === state.confirmpassword) {
      if (state.email.length > 0 && state.name.length > 0 && state.password.length > 0) {
        signupFunction(state)
      } else {
        alert("User credentials is not valid")
      }
    }
    else {
      alert("User credentials is not valid")
    }

  }

  function userinput(e) {
    setstate(
      {
        ...state,
        [e.target.name]: e.target.value,
      }
    )
  }

  return (
    <div className="backgroundContainer">
      <div className="container-md-fluid containerLocation">
        <div className="row">
          <div className="col-lg-12 col-md-10 CredentialsHeading">
            <h1>Flight Management System <FlightTakeoffRoundedIcon /></h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-10 Login">
            {displayLoginCredentials ? <LoginComp userinput={userinput} login={login} /> : <RegistrationCredentialsComp userinput={userinput} register={register} />}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-10 switchdiv">
            <button className="button controlposition" onClick={() => { setdisplayLoginCredentials(true); }}>Login Credentials</button>
            <div className="verticalline"></div>
            <button className="button" onClick={() => { setdisplayLoginCredentials(false); }}>Registration Credentials</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoginComp(props) {
  return (
    <div className="row">
      <div className="col-md-6 col-sm-6 registration">
        <input className="inputfields" name="email" onChange={(e) => props.userinput(e)} placeholder="Enter email" required />
        <input className="inputfields" type="password" name="password" onChange={(e) => props.userinput(e)} placeholder="Enter password" required />
        <button className="button" onClick={() => props.login()}>Login <LoginRoundedIcon /></button>
      </div>
      <div className="col-md-6 col-sm-5 facebookbtnlocation">
        <button className="button" onClick={() => FacebookSignFunction()}>
          <FacebookRoundedIcon /> Facebook
        </button>
      </div>
    </div>
  );
}

export function RegistrationCredentialsComp(props) {
  return (
    <>
      <input className="inputfields" name="name" onChange={(e) => props.userinput(e)} placeholder="Enter name" required />
      <input className="inputfields" name="email" onChange={(e) => props.userinput(e)} placeholder="Enter email" required />
      <input className="inputfields" name="password" onChange={(e) => props.userinput(e)} placeholder="Enter password" required />
      <input className="inputfields" name="confirmpassword" onChange={(e) => props.userinput(e)} placeholder="Enter confirm password" required />

      <button className="button" onClick={() => props.register()}>
        <AppRegistrationRoundedIcon /> Register
      </button>
    </>
  );
}
