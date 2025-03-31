import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./LoginModal.css";

function LoginModal({ handleClose, handleOpenSignUp }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login } = useAuth(); // Token kezelés
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/profile/login", {
        username: data.username,
        password: data.password,
      });

      const { token } = response.data;

      login(token); // Token mentése a contextben

      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      reset();

      setTimeout(() => {
        handleClose();
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setSnackbarMessage("Invalid login credentials.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <h2>Login to your Actimoji account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Username</p>
        <input 
          className="loginInput" 
          placeholder="Username" 
          {...register("username", { required: "This input is mandatory" })} 
        />
        {errors.username && <span>{errors.username.message}</span>}

        <p>Password</p>
        <input 
          className="loginInput" 
          type="password" 
          {...register("password", { required: "This input is mandatory" })} 
        />
        {errors.password && <span>{errors.password.message}</span>}

        <p id="register" onClick={handleOpenSignUp} style={{ cursor: "pointer" }}>
          Don't have an account? <span style={{ color: "#E85B2C", textDecoration: "underline" }}>Sign up</span> now
        </p>

        <br />
        <input type="submit" value="Submit" id="send" />
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginModal;
