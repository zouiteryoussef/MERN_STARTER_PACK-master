import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import BaseLayout from "./components/BaseLayout";
import ProductsList from "./components/ProductsList";
import Products from "./components/products";
import product from "./store/reducers/product";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  productReducer: product
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <BaseLayout>
        <Switch>
          <Route exact path="/" component={ProductsList} />

          <Route path="/admin" component={Products} />
          
        </Switch>
      </BaseLayout>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
