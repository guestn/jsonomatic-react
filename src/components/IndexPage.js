'use strict';

import React from 'react';
import pageData from '../data/pageData';
import MainMenu from './MainMenu';


import RangeSlider from './RangeSlider';
import Button from './Button';
import { PropTypes } from 'react';
import 'whatwg-fetch';
import CodeMirror from 'react-codemirror';
import fileDownload from 'react-file-download';
import CopyToClipboard from 'react-copy-to-clipboard';


const initialEditorValue = {   
	"name": { 
		"first":"<%FIRSTNAME%>", 
		"last":"<%LASTNAME%>" 
	},
	"email": "<%EMAIL%>",
	"int" : "<%INT(1, 5)%>",
	"date" : "<%DATE('11 Mar 1980',Date.now())%>",
	"phone" : "<%PHONE%>",
	"phone2" : "<%PHONE2%>;"
}

export default class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			generateClicked: false,
			sliderValue: null,
			editorValue: null,
			outputValue: null,
			statusMessage: ''
		}
		
	}
	
	componentWillMount() {
		this.setState({
			generateClicked: false,
			sliderValue: 10,
			editorValue: JSON.stringify(initialEditorValue, null, 2),
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
			outputValue: JSON.stringify(value, null, 2)
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
			data = JSON.parse(data);
			data = JSON.stringify(data, null, 2);

			this.setState({
				outputValue: data,
				generateClicked: true,
				statusMessage: 'Objects Created'
			})
		})
		.catch(function(err) {
				console.log(err)
		});		
		
	}
	
	onDownloadClicked() {
		fileDownload(this.state.outputValue, 'filename.csv');
		this.setState({
			statusMessage: 'File Downloaded'
		})
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
					
					<span className="statusMessage">{this.state.statusMessage}</span>
					
					<div className="button-container">
						<button className="btn-text btn-generate" onClick={this.generateClicked.bind(this)}>Generate</button>
						<CopyToClipboard text={this.state.outputValue}
							onCopy={() => this.setState({statusMessage: 'Objects Copied to Clipboard'})}>
							<button className="btn-icon btn-copy" disabled={!this.state.generateClicked}>Copy</button>
						</CopyToClipboard>
						<button className="btn-icon btn-download" onClick={this.onDownloadClicked.bind(this)} disabled={!this.state.generateClicked}>DL</button>
				 	</div>
				 	
					<div>{this.state.generateClicked}</div>

        </div>

          
      </div>
    );
  }
}
