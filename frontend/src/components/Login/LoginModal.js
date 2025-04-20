import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "./LoginModal.css";

function LoginModal({ handleClose }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login, backendApi } = useContext( AuthContext );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const onSubmit = async (data) => {
    try {
      const response = await backendApi.post("/profile/login", {
        username: data.username,
        password: data.password,
      });

      if (response.data?.token) {
        login(response.data.token);
        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        reset();

        setTimeout(() => {
          handleClose();
          navigate("/");
        }, 1500);
      } else {
        throw new Error("Invalid login credentials.");
      }
    } catch (error) {
      setSnackbarMessage(error.message || "Invalid login credentials.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="modalContainer">
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
