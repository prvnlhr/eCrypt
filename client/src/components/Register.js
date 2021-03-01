import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/auth";
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  err: "",
  success: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authNew);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  const { name, email, password, confirmPassword } = formData;
  return (
    <div>
      <h2>Register</h2>

      {auth.error ? <p>{auth.error}</p> : null}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name </label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="Enter Your email address"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password "
            id="confirmPassword"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <p>
          Already have an account?
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
