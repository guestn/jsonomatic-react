'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/" className="site-logo">
            <img className="logo" src="/img/JSONomatic-logo.svg"/>
            <h1><span>JSON</span>OMATIC</h1>
          </Link>
          <h2>Create Randomized JSON For Your Test Databases</h2>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>Footer Content Here</p>
            
        </footer>
      </div>
    );
  }
}
