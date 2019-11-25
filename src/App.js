import React from 'react';
import logo from './logo.svg';
import Renderer from './components/Renderer';
import './App.css';
import {
  BrowserRouter,
  Route,
  NavLink
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" render={(props) => <Renderer {...props} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
