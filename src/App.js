import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Product from "./components/Product";
import ProductDetails from "./components/ProductDetails";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/:name/:id" component={ProductDetails} />
          <Route path="/" component={Product} />
        </Switch>
      </div>
    );
  }
}

export default App;
