'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import MainMenu from './MainMenu';

export default class SettingsPage extends React.Component {
  render() {
        return (
      <div className="secondary-page">
        <MainMenu/>
        <div className="main-pane">

          <div className="picture-container">
            <h2 className="name">Settings</h2>
          </div>
          <div className="types-description">
          	<dl><dt>&lt;%FIRSTNAME%&gt;</dt>
	          	<dd>A random first name</dd>
	          	<dt>&lt;%LASTNAME%&gt;</dt>
	          	<dd>A random surname</dd>
	          	<dt>&lt;%COMPANY%&gt;</dt>
	          	<dd>A randomly created company name</dd>
	          	<dt>&lt;%EMAIL%&gt;</dt>
	          	<dd>creates an email in the format &lt;%FIRSTNAME%&gt;.&lt;%LASTNAME%&gt;@&lt;%COMPANY%&gt;.com if created in the same object, or creates a random email if not</dd>
	          	<dt>&lt;%INT(arg1, arg2)%&gt;</dt><dd>creates a random integer in the range between arg1 and arg2</dd>
	          	<dt>&lt;%DATE(arg1, arg2)%&gt;</dt>
	          	<dd>creates a random date between date1 and date2</dd>	
	          	<dt>&lt;%PHONE%&gt;</dt>
	          	<dd>creates a random 10 digit phone number</dd>
	          	<dt>&lt;%PHONE2%&gt;</dt>
	          	<dd>creates random 10 digit phone number, formatted (000) 000 0000</dd>
	          	<dt>&lt;%TEXT(arg1)%&gt;</dt><dd>creates arg1 words of random lorem ipsum text</dd>
          	</dl>
          </div>
          
        </div>
        <div className="navigateBack">
          <Link to="/">« Back to the index</Link>
        </div>
      </div>
    );
  }
}
