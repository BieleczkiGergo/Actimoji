import React from "react";
import { useForm } from "react-hook-form";
import styles from "./BecomeMod.module.css";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function BecomeMod() {
  const { user, token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log("Aktív user objektum:", user);

  const onSubmit = async (data) => {
    try {
      if (!user || !user.userId) {
        alert("Hiányzó felhasználói azonosító.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/mod/request",
        {
          reason: data.reason,
          requestedId: user.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Mod request submitted:", response.data);
      alert("Kérelmed sikeresen elküldve!");
      reset();
    } catch (error) {
      console.error("Hiba a kérés elküldésekor:", error);
    }
  };

  return (
    <div className={styles.modalContent}>
      <h2>Become a Mod</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            id="reason"
            {...register("reason", {
              required: "The reason field is mandatory!",
              minLength: {
                value: 5,
                message: "The reason must be at least 5 characters long",
              },
            })}
            placeholder="Why would you like to become a mod?"
            className={styles.reason}
          />
          {errors.reason && (
            <p className={styles.error}>{errors.reason.message}</p>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default BecomeMod;
