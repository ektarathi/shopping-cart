import React, { Component } from "react";
import { shallow, configure, mount } from "enzyme";
import Product from "../Product";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const props = {
  error: null,
  isLoaded: true
};
describe("Product", () => {
  let data;
  it("fetch correctly", async () => {
    const response = await fetch(
      "https://api.johnlewis.com/v1/products/search?q=dishwasher&key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb&pageSize=20"
    );
    data = await response.text();

    expect(data).not.toBe(null);
  });

  it("should render correctly ", () => {
    console.log("data", data);
    const wrapper = mount(<Product {...props} />);
    const product = wrapper.find(".product");
    console.log(wrapper.debug());
    expect(product).toHaveLength(1);
    //const product__item = wrapper.find(".product__item");
    //expect(product__item).toHaveLength(0);
    //expect(wrapper.find(".product__item__image").exists()).toBe(true);
  });
});
