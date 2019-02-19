import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/product.scss";
class Product extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  componentDidMount() {
    fetch(
      "https://api.johnlewis.com/v1/products/search?q=dishwasher&key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb&pageSize=20"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.products
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    console.log("Items", items);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="product">
          {items.map(item => (
            <div key={item.productId} className="product__item">
              <div className="product__item__details">
                <Link to={`/${item.title}/${item.productId}`}>
                  <img
                    src={item.image}
                    className="product__item__image"
                    alt={item.title}
                  />
                </Link>
                <div className="product__item__name">{item.title}</div>
                <div className="product__item__price">£{item.price.now}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Product;
