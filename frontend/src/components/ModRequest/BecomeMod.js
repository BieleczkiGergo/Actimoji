import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./BecomeMod.module.css";
import { AuthContext } from "../Context/AuthContext";

function BecomeMod({ onRequestSubmitted, handleCloseModal }) {
  const { user, token, backendApi } = useContext( AuthContext );
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (!user || !user.userId) {
        return;
      }

      setIsSubmitting(true);

      const response = await backendApi.post(
        "/mod/request",
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
      onRequestSubmitted();
      reset();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting the request:", error);
    } finally {
      setIsSubmitting(false);
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
          {errors.reason && <p className={styles.error}>{errors.reason.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default BecomeMod;
