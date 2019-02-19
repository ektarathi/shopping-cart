import React, { Component } from "react";
import { shallow, configure } from "enzyme";
import Product from "../Product";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Product", () => {
  it("fetch correctly", async () => {
    let data;
    const response = await fetch(
      "https://api.johnlewis.com/v1/products/search?q=dishwasher&key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb&pageSize=20"
    );
    data = await response.text();

    expect(data).not.toBe(null);
  });

  it("should render correctly ", () => {
    const wrapper = shallow(<Product isLoaded={true} />);
    const product = wrapper.find(".product");
    console.log(wrapper.debug());
    expect(product).toHaveLength(0);
    const product__item = wrapper.find(".product__item");
    expect(product__item).toHaveLength(0);
  });
});
