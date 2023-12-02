import React, { useState } from "react";

interface ApiResponse {
  status: number;
  user?: {
    token: string;
  };
  errorMsg?: string;
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const storedToken = localStorage.getItem("api-Token");

    if (storedToken) {
    } else {
      const apiUrl = "url-catre-endpointul-de-login";

      const requestData = {
        email: email,
        password: password,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          if (data.status === 200) {
            localStorage.setItem("api-Token", data.user?.token || "");
          } else {
            const errorMsg = data.errorMsg || "Error during login.";
            setError(errorMsg);
          }
        })
        .catch((error) => {
          console.error("Error during login request:", error);
          const errorMsg = "Error during login.";
          setError(errorMsg);
        });
    }
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Submit</button>
      <div id="error-message">{error && <p>{error}</p>}</div>
    </div>
  );
}
