import React from 'react';

export const GeminiIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 65 65" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <mask id="maskme" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="65" height="65">
      <path d="M32.5 0C14.55 0 0 14.55 0 32.5S14.55 65 32.5 65 65 50.45 65 32.5 50.45 0 32.5 0zm0 60C17.664 60 5 47.336 5 32.5S17.664 5 32.5 5 60 17.664 60 32.5 47.336 60 32.5 60z" fill="#000"/>
    </mask>
    <g mask="url(#maskme)">
      <path d="M32.5 0C14.55 0 0 14.55 0 32.5S14.55 65 32.5 65 65 50.45 65 32.5 50.45 0 32.5 0z" fill="#4285F4"/>
      <path d="M32.5 5C17.664 5 5 17.664 5 32.5S17.664 60 32.5 60 60 47.336 60 32.5 47.336 5 32.5 5z" fill="#34A853"/>
      <path d="M32.5 10C20.013 10 10 20.013 10 32.5S20.013 55 32.5 55 55 44.987 55 32.5 44.987 10 32.5 10z" fill="#FBBC04"/>
      <path d="M32.5 15C22.361 15 15 22.361 15 32.5S22.361 50 32.5 50 50 42.639 50 32.5 42.639 15 32.5 15z" fill="#EA4335"/>
    </g>
  </svg>
);
