import { Button } from '@mantine/core';
import React from 'react';

export const Admin = () => {
  const handleGoogleLogin = async () => {
    try {
      window.location.replace('http://localhost:8008/api/v1/auth/token');
      
      
      
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Button onClick={handleGoogleLogin}>
      Login with Google
    </Button>
  );
};
