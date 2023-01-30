import React from 'react';
import {Navigation} from './src/navigation/Navigation';
import {AuthenticationContextProvider} from './src/services/authentication/AuthenticationContext';

function App() {
  return (
    <AuthenticationContextProvider>
      <Navigation />
    </AuthenticationContextProvider>
  );
}

export default App;
