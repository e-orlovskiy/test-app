import { useState } from "react";
import { useNavigate } from "react-router";
import { apiFetch } from "../api/fetch";
import { useAuth } from "../store/authStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setTokens = useAuth((state) => state.setTokens);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: { username, password },
    });
    if (res.status === 200) {
      setTokens(res.tokens);
      nav("/");
    } else {
      alert(res.msg);
    }
    setLoading(false);
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <form onSubmit={submit} className="form">
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
}
