// pages/auth/login.tsx
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (status?.ok) {
      router.push("/"); // Redirect to home on successful login
    } else {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
