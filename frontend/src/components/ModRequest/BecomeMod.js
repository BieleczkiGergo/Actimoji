import React from "react";
import { useForm } from "react-hook-form";
import styles from "./BecomeMod.module.css";

function BecomeMod() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted with reason: ", data.reason);
    reset();
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
            placeholder="Reason for ..."
            className={styles.reason}
          />
          {errors.reason && <p className={styles.error}>{errors.reason.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}

export default BecomeMod;
