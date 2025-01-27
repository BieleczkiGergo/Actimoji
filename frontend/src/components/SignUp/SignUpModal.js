import React from "react";
import { useForm } from "react-hook-form";
import "./SignUpModal.css";

function SignUpModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Sign Up Data:", data);
    reset();
  };

  return (
    <>
      <h2>Create your Actimoji account</h2>
      <div id="signup-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Username</p>
          <input
            className="signupInput"
            placeholder="Username"
            {...register("Username", {
              required: "This input is mandatory",
            })}
          />
          {errors.Username && <span><br/>{errors.Username.message}</span>}

          <p>Email</p>
          <input
            id="email-input"
            className="signupInput"
            type="email"
            placeholder="Email"
            {...register("Email", {
              required: "This input is mandatory",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.Email && <span><br/>{errors.Email.message}</span>}

          <p>Password</p>
          <input
            className="signupInput"
            type="password"
            {...register("Password", {
              required: "This input is mandatory",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.Password && <span><br/>{errors.Password.message}</span>}

          <p>Password again</p>
          <input
            className="signupInput"
            type="password"
            {...register("Password", {
              required: "This input is mandatory",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.Password && <span><br/>{errors.Password.message}</span>}


          <br />
          <input type="submit" value="Sign Up" id="signup-send" />
        </form>
      </div>
    </>
  );
}

export default SignUpModal;
