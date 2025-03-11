import React from "react";
import { useForm } from "react-hook-form";
import "./LoginModal.css";

function LoginModal({ handleClose, handleOpenSignUp }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    reset();
  };

  return (
    <div>
      <h2>Login to your Actimoji account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Username</p>
        <input
          className="loginInput"
          placeholder="Username"
          {...register("Username", { required: "This input is mandatory" })}
        />
        {errors.Username && <span>{errors.Username.message}</span>}

        <p>Password</p>
        <input
          className="loginInput"
          type="password"
          {...register("Password", { required: "This input is mandatory" })}
        />
        {errors.Password && <span>{errors.Password.message}</span>}

        <p id="register" onClick={handleOpenSignUp} style={{ cursor: "pointer" }}>
          Don't have an account? <a href="" >Sign up</a> now
        </p>

        <br />
        <input type="submit" value="Submit" id="send" />
      </form>
    </div>
  );
}

export default LoginModal;
