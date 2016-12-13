'use strict';

import React from 'react';
import { Link } from 'react-router';
import pageData from '../data/pageData';

export default class MainMenu extends React.Component {
  render() {
    return (
      <nav className="main-menu">
      	<Link to="/" activeClassName="active">Home</Link>
        {pageData.map(data => {
          return <Link key={data.id} to={`/${data.id}`} activeClassName="active">
            {data.name}
          </Link>;
        })}
      </nav>
    );
  }
}
