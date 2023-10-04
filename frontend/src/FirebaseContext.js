//FirebaseContext.js
// Import the createContext function from React to create a new context.
import { createContext} from 'react';
// Create a Firebase context with a default value of null.
// This context will be used to provide and consume Firebase-related functionalities  throughout the React component tree.
const FirebaseContext = createContext();

// Export the Firebase context so other parts of the app can use it.
export default FirebaseContext;
