import { useState } from "react";
import { useNavigate } from "react-router";
import { apiFetch } from "../api/fetch";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: { username, password },
    });
    if (res.status === 201) nav("/login");
  };

  return (
    <form onSubmit={submit} className="form">
      <h2>Register</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}
