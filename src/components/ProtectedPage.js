// components/ProtectedPage.js
"use client";

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ProtectedPage = ({ children }) => {
  const [verified, setVerified] = useState(false);

  const handleRecaptcha = async (token) => {
    if (!token) return;

    try {
      const response = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.verified) {
        setVerified(true);
      } else {
        alert('Captcha verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('An error occurred while verifying captcha.');
    }
  };

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
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={handleRecaptcha}
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedPage;
