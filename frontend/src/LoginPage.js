//LoginPage.js
// Import necessary modules from react, firebase, and the FirebaseContext.
import React, { useState, useContext } from 'react';
import firebaseAuth from 'firebase-auth';
import FirebaseContext from './FirebaseContext'; 

function LoginPage() {
  // Define local state for the email and password inputs, and error messages.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use the FirebaseContext to get the current user and the setCurrentUser function.
  const {setCurrentUser } = useContext(FirebaseContext);

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    // Firebase configuration settings.
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
        authDomain: "dsctdisertation.firebaseapp.com",
        projectId: "dsctdisertation",
        storageBucket: "dsctdisertation.appspot.com",
        messagingSenderId: "646787657364",
        appId: "1:646787657364:web:e7049c79bbad4e49458e81",
        measurementId: "G-6C96L0B9P2"
    };
      
    try {
      // Attempt to authenticate the user with the provided email and password.
      const rootRef = await firebaseAuth(firebaseConfig);
      setCurrentUser(rootRef); // Update the context state with the authenticated user.
      // If successful, user is redirected to a protected route or dashboard.
    } catch (err) {
      setError(err.message); // If an error occurs during authentication, set the error state.
    }
  };

  return (
    // Render the login form.
    <div className="container">
      <h2>Login</h2>
      {/* Display any error messages. */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          {/* Bind the email state to the email input field. */}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          {/* Bind the password state to the password input field. */}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        </div>
        {/* Submit button for the form. */}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

// Export the LoginPage component.
export default LoginPage;
