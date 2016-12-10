'use strict';

import React from 'react';
import AthletePreview from './AthletePreview';
import athletes from '../data/athletes';
import AthletesMenu from './AthletesMenu';
import brace from 'brace';
import AceEditor from 'react-ace';
import RangeSlider from './RangeSlider';
import Button from './Button';
import { PropTypes } from 'react'
import 'whatwg-fetch'




import 'brace/mode/java';
import 'brace/theme/github';


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
		console.log(this.state.editorValue)
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

			return response.json();

		})
		.then((data) => {
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
		
		/*fire it to the backend*/
/*
	    $.ajax({
		  type: "POST",
		  url: '/submit',
		  data: {output: output, repeats: repeats},
		  //success: success,
		  dataType: 'text'
		}).success(function(data){
			console.log(data);
			data = JSON.parse(data);
			data = JSON.stringify(data, null, 4);
			$('#outputPane').val(data);
			
			var msg = repeats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' objects added successfully'
			displayMessage(msg);
		});
		
*/
	}
	
  render() {
	 	const value = this.state.value;

    return (
      <div className="home">
        <AthletesMenu/>
          
      	<div className="main-pane">
      		{this.state.sliderValue}
      	
      		<RangeSlider value={this.state.sliderValue} handleSlider={this.handleSlider.bind(this)}/>
      	
					<AceEditor
						mode="java"
						theme="github"
						onChange={this.onEditorChanged.bind(this)}
						name="editor"
						height="500px"
						width="50%"
						editorProps={{$blockScrolling: true}}
						value={this.state.editorValue}
					/>
					<textarea className="outputPane cf" value={this.state.outputValue} onChange={this.onOutputChanged.bind(this)}/>  
				 					<button className="square" onClick={this.generateClicked.bind(this)}>Generate</button>
					<div>{this.state.generateClicked}</div>
	        <div className="athletes-selector">
	          {athletes.map(athleteData => <AthletePreview key={athleteData.id} {...athleteData} />)}
	        </div>
        </div>
      </div>
    );
  }
}
