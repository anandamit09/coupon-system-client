import React, { useState, useEffect } from "react";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import UserPage from "./components/UserPage";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAdmin(true);
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
    setShowAdminPanel(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    setShowAdminPanel(false);
  };

  const togglePanel = () => {
    if (showAdminPanel) {
      // If switching to User Page, log out admin
      handleLogout();
    } else {
      setShowAdminPanel(true);
    }
  };

  return (
    <div>
      <button onClick={togglePanel}>
        {showAdminPanel ? "Go to User Page" : "Go to Admin Panel"}
      </button>

      {showAdminPanel ? (
        isAdmin ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <AdminPanel />
          </>
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )
      ) : (
        <UserPage />
      )}
    </div>
  );
}

export default App;