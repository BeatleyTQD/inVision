import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./Providers/UserProfileProvider";
import { DreamProvider } from './Providers/DreamProvider';
import { WhyProvider } from './Providers/WhyProvider';
import { HowProvider } from './Providers/HowProvider';
import { CompletedHowProvider } from './Providers/CompletedHowProvider';
import ApplicationViews from "./Components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <DreamProvider>
          <HowProvider>
            <WhyProvider>
              <CompletedHowProvider>
                <ApplicationViews />
              </CompletedHowProvider>
            </WhyProvider>
          </HowProvider>
        </DreamProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;