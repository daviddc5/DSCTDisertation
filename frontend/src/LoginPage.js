//LoginPage.js
// Import necessary modules from react, firebase, and the FirebaseContext.
import React, { useState, useContext } from 'react';
import firebase from './firebase'; // <-- Import initialized firebase
import FirebaseContext from './FirebaseContext'; 

function LoginPage() {
  // Define local state for the email and password inputs, and error messages.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use the FirebaseContext to get the setCurrentUser function.
  const {setCurrentUser } = useContext(FirebaseContext);

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    try {
      // Attempt to authenticate the user with the provided email and password.
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password); // <-- Using the actual Firebase auth
      const user = userCredential.user;
      setCurrentUser(user);
      // TODO: Redirect the user to a dashboard or another route after successful login.
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
