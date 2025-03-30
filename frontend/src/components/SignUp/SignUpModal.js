import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./SignUpModal.css";

function SignUpModal({ handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/profile/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      alert(`Registration successful: ${response.data.message}`);
      reset();
      handleClose();
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
          {...register("username", { required: "This input is mandatory" })}
        />
        {errors.username && <span>{errors.username.message}</span>}

        <p>Email</p>
        <input
          className="signupInput"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "This input is mandatory",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <p>Password</p>
        <input
          className="signupInput"
          type="password"
          {...register("password", {
            required: "This input is mandatory",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <br />
        <input type="submit" value="Sign Up" id="signup-send" />
      </form>
    </div>
  );
}

export default SignUpModal;
