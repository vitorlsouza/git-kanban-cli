import React, { Fragment } from 'react';

import GlobalStyle from './styles/global';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Dashboard />
    </Fragment>
  );
}

export default App;
