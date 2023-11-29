import { AuthClient } from "@dfinity/auth-client";
import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Messaging from "./Components/Messaging";

const env = process.env.DFX_NETWORK || "local";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    const authClient = await AuthClient.create({
      idleOptions: {
        idleTimeout: 1000 * 60 * 30,
        disableDefaultIdleCallback: true,
      },
    });
    await authClient.login({
      identityProvider:
        env === "local"
          ? `http://localhost:4943?canisterId=${"avqkn-guaaa-aaaaa-qaaea-cai"}`
          : "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        checkAuth();
      },
    });
  };

  const checkAuth = async () => {
    try {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Error on check auth ", error);
    }
  };

  const logout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="bg-white min-h-screen h-full">
      <Navbar {...{ login, logout, isAuthenticated }} />
      <Messaging {...{isAuthenticated}} />
    </div>
  );
};

export default App;
