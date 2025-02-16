// components/ProtectedPage.js
"use client";

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ProtectedPage = ({ children }) => {
  const [verified, setVerified] = useState(false);

  const handleRecaptcha = (value) => {
    if (value) {
      setVerified(true);
    }
  };

  // Only apply centering styles when the user needs to verify
  if (!verified) {
    return (
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          width: '100vw',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <p style={{ marginBottom: '10px' }}>Please verify you are not a robot</p>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_KEY}
            onChange={handleRecaptcha}
          />
        </div>
      </div>
    );
  }

  // Render children (main content) once verified
  return <>{children}</>;
};

export default ProtectedPage;
