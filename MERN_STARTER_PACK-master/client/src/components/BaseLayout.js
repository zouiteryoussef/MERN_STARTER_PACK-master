import React, { Component } from "react";
import Menu from "./Menu";
class BaseLayout extends Component {
  render() {
    return (
      <div id="container">
        <Menu />
        {this.props.children}
      </div>
    );
  }
}

export default BaseLayout;
