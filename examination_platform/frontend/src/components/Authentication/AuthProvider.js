import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get user data from localStorage or set as null if none exists
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(savedUser || null);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user to localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  // Effect to check if user is already logged in on initial load
  useEffect(() => {
    if (savedUser) {
      setUser(savedUser);
    }
  }, [savedUser]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
