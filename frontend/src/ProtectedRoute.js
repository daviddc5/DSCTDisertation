//ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
// The ProtectedRoute component ensures that certain routes in the application can only be accessed if the user is authenticated.
function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  
  // If the user is authenticated, users will be able to access the protected component.
  // Otherwise, they will be redirected to the login page.
  return (
    <Route
      // Spread in the rest of the properties passed to this component
      {...rest}
      
      // Determine whether to render the protected component or redirect to login
      render={props =>
        isAuthenticated ? ( // If the user is authenticated
          <Component {...props} /> // Render the protected component
        ) : (
          // Otherwise, redirect them to the login page
          <Navigate replace={true} to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
