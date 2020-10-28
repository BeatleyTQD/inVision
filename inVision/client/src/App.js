import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./Providers/UserProfileProvider";
import { DreamProvider } from './Providers/DreamProvider';
import ApplicationViews from "./Components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <DreamProvider>
          <ApplicationViews />
        </DreamProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;