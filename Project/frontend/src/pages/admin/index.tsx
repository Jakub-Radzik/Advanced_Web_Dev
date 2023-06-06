import React, { useEffect } from 'react';

export const Admin = () => {
  const handleGoogleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then((googleUser: any) => {
      // Retrieve user information
      const profile = googleUser.getBasicProfile();
      const email = profile.getEmail();
      const name = profile.getName();
      
      // You can use the retrieved information for further processing or send it to your server for authentication
      console.log('Email:', email);
      console.log('Name:', name);
    });
  };

  useEffect(() => {
    // Load Google API Client script dynamically
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '181433232492-d3mk5g8rqupbek3g1i99713llp9r60mh.apps.googleusercontent.com',
        });
      });
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <button onClick={handleGoogleLogin}>
      Login with Google
    </button>
  );
};