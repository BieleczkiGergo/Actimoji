import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SignUpModal.css";

function SignUpModal({ handleClose }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8080/profile/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      setOpenSnackbar(true);

      reset();

      setTimeout(() => {
        handleClose();
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="modalContainer">
      <h2>Create your Actimoji account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Username</p>
        <input 
          className="signupInput" 
          placeholder="Username" 
          {...register("username", { 
            required: "This input is mandatory", 
            minLength: { value: 4, message: "Username must be at least 4 characters" } 
          })} 
        />
        {errors.username && <span>{errors.username.message}</span>}

        <p>Email</p>
        <input 
          className="signupInput" 
          type="email" 
          placeholder="Email" 
          {...register("email", { 
            required: "This input is mandatory", 
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } 
          })} 
        />
        {errors.email && <span>{errors.email.message}</span>}

        <p>Password</p>
        <input 
          className="signupInput" 
          type="password" 
          placeholder="Password"
          {...register("password", { 
            required: "This input is mandatory", 
            minLength: { value: 6, message: "Password must be at least 6 characters" } 
          })} 
        />
        {errors.password && <span>{errors.password.message}</span>}

        <p>Confirm Password</p>
        <input 
          className="signupInput" 
          type="password" 
          placeholder="Confirm Password"
          {...register("confirmPassword", { 
            required: "This input is mandatory", 
            validate: value => value === password || "Passwords do not match" 
          })} 
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

        <br />
        <input type="submit" value="Sign Up" id="signup-send" />
      </form>

      {/* Snackbar visszajelzés csak sikeres regisztráció esetén */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success"> 
          Registration successful!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignUpModal;
