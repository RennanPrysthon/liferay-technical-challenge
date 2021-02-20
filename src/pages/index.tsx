import React from 'react';

import GlobalStyles from '../styles/global'

import { ToastProvider } from 'react-toast-notifications';

import Home from './Home';

function App() {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      placement="bottom-right"
    >
      <Home />
      <GlobalStyles/ >
    </ToastProvider>
  );
}

export default App;
