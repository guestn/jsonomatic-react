'use strict';

import React from 'react';
import pageData from '../data/pageData';
import MainMenu from './MainMenu';


import RangeSlider from './RangeSlider';
import Button from './Button';
import { PropTypes } from 'react';
import 'whatwg-fetch';
import CodeMirror from 'react-codemirror';



/*

if (typeof window != 'undefined') {
	var brace = require('brace');
	var AceEditor= require('react-ace');
	require('brace/mode/java');
	require('brace/theme/github');
}
*/
//if (typeof window != 'undefined') {
/*

	var AceEditor  = require('react-ace-wrapper');

	require('brace/mode/java');
	require('brace/theme/github');
*/


//}
/*
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';
*/


export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			generateClicked: false,
			sliderValue: null,
			editorValue: null,
			outputValue: null,
		}
		
	}
	
	componentWillMount() {
		this.setState({
			generateClicked: false,
			sliderValue: 10,
			editorValue: '{"hello folks":"hi"}',
			outputValue: 'output'
		});	
	}
	
	handleSlider(value) {
		this.setState({
			sliderValue: value
		})
	}
	
	onEditorChanged(value) {
		this.setState({
			editorValue: value
		})
	console.log('this.state.editorValue',this.state.editorValue)
	}
	
	onOutputChanged(value) {
		this.setState({
			outputValue: value
		})
	}
	
	generateClicked() {
		this.setState({
			generateClicked: true
		})
		
		var output = this.state.editorValue;
		var repeats = this.state.sliderValue;
		var Jobj = JSON.stringify(output)
		output = output.trim();
		
		console.log(output)
	
		var payload = {output: output, repeats: repeats};
			
		var request = new Request('/submit', {
			method: 'POST', 
			headers: new Headers({
				'Content-Type': 'application/json',
				      'Accept': 'application/json',

			}),
			body: JSON.stringify(payload),

		});

// Now use it!
		
		fetch(request).then((response) => {
			//JSON.parse(data.body);
			//data = JSON.stringify(data, null, 4)
			console.log('response',response)
			return response.json();

		})
		.then((data) => {
			console.log('data', data)
			//data = JSON.parse(data);
			//data = JSON.stringify(data, null, 4);

			this.setState({
				outputValue: data
			})
		})
		.catch(function(err) {
			// Error :(
				console.log(err)
		});		
		
	}
	
  render() {
	 	const value = this.state.value;

    return (
      <div className="home">
        <MainMenu/>
        
        <div className="main-pane">
      		<div className="rangeslider-container">
      			<div className="rangeslider-container-title">Number of Objects</div>
      			<div className="rangeslider-value">{this.state.sliderValue}</div>
						<RangeSlider value={this.state.sliderValue} handleSlider={this.handleSlider.bind(this)}/>
					</div>
					

					<CodeMirror 
						value={this.state.editorValue} 
						onChange={this.onEditorChanged.bind(this)}
						options={{
            	lineNumbers: true,
        		}}
					/>
					
					<textarea className="outputPane cf" value={this.state.outputValue} onChange={this.onOutputChanged.bind(this)}/>  
					<div className="button-container">
						<button className="btn-text btn-generate" onClick={this.generateClicked.bind(this)}>Generate</button>
						<button className="btn-icon btn-copy" onClick={this.generateClicked.bind(this)}>Copy</button>
						<button className="btn-icon btn-download" onClick={this.generateClicked.bind(this)}>DL</button>
				 	</div>
				 	
					<div>{this.state.generateClicked}</div>

        </div>

          
      </div>
    );
  }
}
