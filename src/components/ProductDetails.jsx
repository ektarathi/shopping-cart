import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import EllipsisText from "react-ellipsis-text";
import { withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/product_details.scss";
class ProductDetails extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  componentDidMount() {
    fetch(
      `https://api.johnlewis.com/v1/products/${
        this.props.match.params.id
      }?key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
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

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="product_details">
          <div className="product_details__heading">
            <div>
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faChevronLeft}
                onClick={this.props.history.goBack}
              />
            </div>
            <div>{items.title}</div>
          </div>
          <div className="product_details__content">
            <div className="product_details__content__section1">
              <div className="product_details__content__topSection">
                <div className="product_details__content__carousel">
                  <div className="product_details__content__carousel--carousel_items">
                    <Carousel
                      showStatus={false}
                      autoPlay
                      interval={1000}
                      infiniteLoop
                    >
                      {items.media.images.urls.map(image => (
                        <div key={image}>
                          <img src={image} alt={image} />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
              </div>
              <div className="product_details__content__bottomSection">
                <div className="product_details__content__hide_show_data">
                  <div className="product_details__content__additional_info">
                    <div className="product_details__content__additional_info--price">
                      £{items.price.now}
                    </div>
                    <div className="product_details__content__additional_info--offer">
                      {items.displaySpecialOffer}
                    </div>
                    <div className="product_details__content__additional_info--services">
                      {items.additionalServices.includedServices}
                    </div>
                  </div>
                </div>
                <div className="product_details__content__item_information">
                  <h3>Product Information</h3>
                  <div className="product_details__content__item_information--item_code">
                    Product Code: {items.code}
                  </div>
                  <EllipsisText
                    text={items.details.productInformation.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    )}
                    length={550}
                  />
                </div>
                <div className="product_details__content__item_specification">
                  <h3>Product Specification</h3>
                  <div className="product_details__content__item_specification__details">
                    {items.details.features[0].attributes.map(info => (
                      <div
                        key={info.name}
                        className="product_details__content__item_specification__content"
                      >
                        <div>{info.name}</div>
                        <div className="product_details__content__item_specification__content--info_value">
                          {info.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="product_details__content__section2">
              <div className="product_details__content__additional_info">
                <div className="product_details__content__additional_info--price">
                  £{items.price.now}
                </div>
                <div className="product_details__content__additional_info--offer">
                  {items.displaySpecialOffer}
                </div>
                <div className="product_details__content__additional_info--services">
                  {items.additionalServices.includedServices}
                </div>
              </div>
            </div>
          </div>
          <div />
        </div>
      );
    }
  }
}

export default withRouter(ProductDetails);
