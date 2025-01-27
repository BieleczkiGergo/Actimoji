import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginModal.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SignUpModal from "../SignUp/SignUpModal.js";

function LoginModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    reset();
  };

  return (
    <>
      <h2>Login to your actimoji account</h2>
      <div id="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Username</p>
          <input
            className="loginInput"
            placeholder="Username"
            {...register("Username", { 
                required: "This input is mandatory"
            })}
          />
          {errors.Username && <span><br/>{errors.Username.message}</span>}

          <p>Password</p>
          <input
            className="loginInput" 
            type="password"
            {...register("Password", { 
                required: "This input is mandatory"
            })}
          />
          {errors.Password && <span><br/>{errors.Password.message}</span>}

          <p id="register" onClick={handleSignUpOpen} style={{cursor: 'pointer'}}>Don't have an account? <a>Sign up</a> now</p>

          <br />
          <input type="submit" value="Submit" id="send"/>
        </form>
      </div>

      {/* Sign Up Modal */}
      <Modal
        open={signUpOpen}
        onClose={handleSignUpClose}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
      >
        <Box className="modalContainer">
          <SignUpModal />
        </Box>
      </Modal>
    </>
  );
}

export default LoginModal;
