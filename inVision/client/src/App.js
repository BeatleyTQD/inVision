import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./Providers/UserProfileProvider";
import ApplicationViews from "./Components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
}

export default App;