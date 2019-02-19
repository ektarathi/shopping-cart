import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Product from "./components/Product";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Product />
      </div>
    );
  }
}

export default App;
