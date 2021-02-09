import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteMain from './RouteMain';
import NavBar from 'page/NavBar';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter basename="/homestay">
        <NavBar />
        <RouteMain />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
