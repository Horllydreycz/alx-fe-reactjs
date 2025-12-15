import React from "react";
import { useState } from "react";
import FormikForm from "./formikForm";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    console.log("Form submitted:", formData);
    alert("Registration successful!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" value={formData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email
        <input type="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password
        <input
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default RegistrationForm;
