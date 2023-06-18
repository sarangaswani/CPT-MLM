import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Login form submitted");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="container mx-auto ml-9 md:ml-15 text-left">
      <h2 className="text-2xl md:text-4xl text-white font-bold mt-9">Login</h2>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-lg text-white">Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label className="text-lg text-white">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
