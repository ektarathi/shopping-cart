import React from "react";
import ReactDOM from "react-dom";
import { mount, configure } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";
import Product from "./components/Product";
import NotFoundPage from "./components/NotFound";
import App from "./App";

configure({ adapter: new Adapter() });

test("invalid path should redirect to 404", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/random"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Product)).toHaveLength(0);
  expect(wrapper.find(NotFoundPage)).toHaveLength(1);
});

test("valid path should not redirect to 404", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Product)).toHaveLength(1);
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});
