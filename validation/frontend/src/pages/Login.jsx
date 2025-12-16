import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = auth.login(username, password);

    if (success) {
      // Call backend middleware
      await fetch("http://localhost:3000/check");
      navigate("/seasons");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="center">
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
