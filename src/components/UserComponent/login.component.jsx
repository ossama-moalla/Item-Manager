import {ForceRender} from '../../index.js'
  import  { useState } from "react";
  import axios from 'axios';

import styles from "./Login.module.css";

import { useForm } from "react-hook-form";
import Register from './Register.component.jsx';

function Login (){
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState();
  const onSubmit = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    });
    axios.post("http://localhost:5000/user/login/",data)
    .then(res => {

      setMessage({
        data:   "Logged in successfully, redirecting...",
        type: "alert-success",
      });
      setTimeout(() => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("email", data.email);

        ForceRender();
      }, 3000);

     e.target.reset();
    }).catch(err=>{
          setMessage({
            data: err.response.data.error,
            type:  "alert-danger" ,
          });
        });
  };
  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={styles.loginFormContainer}>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border p-3 rounded">
          <legend
            className={`${styles.loginFormLegend} border rounded p-1 text-center`}
          >
            Login Form
          </legend>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForEmail">Email address</label>
              <span className="mandatory">*</span>
              <input
                id="inputForEmail"
                name="email"
                type="email"
                className="form-control"
                aria-describedby="Enter email address"
                placeholder="Enter email address"
                {...register("email",{
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                })}
              />
              {/**
               * we provide validation configuration for email field above
               * error message are displayed with code below
               */}
              {errors.email && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                {...register("password",{
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>

              <button className="btn btn-link ml-auto">
              <a href="/register"  >SignUP</a>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
      
    </div>
  );
};

export default Login;