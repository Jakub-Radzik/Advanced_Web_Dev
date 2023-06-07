import React, { useEffect } from 'react';
import axios from 'axios';

export const Admin = () => {
  const handleGoogleLogin = async () => {
    try {
      window.location.replace('http://localhost:8008/api/v1/auth/token');
      
      
      
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Login with Google
    </button>
  );
};
