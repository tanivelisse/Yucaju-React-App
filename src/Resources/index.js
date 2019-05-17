import React, { Component } from 'react';

class Resources extends Component {
	constructor(props){
		super();
		this.state = {
			resources: [],
		}
	}	
	render(){

		
		
		const userResources = this.props.resources.map( (name,i )=> {
			//console.log(name + " this is name in userResources");
			return(
				<li key={i} value={name}>
					<span>{name.type}</span><br/>
					<span>{name.description}</span><br/>
        			<button onClick={this.props.showModal.bind(null, name)}>Edit</button>
					<button onClick={this.props.delete.bind(null, name._id)}>Delete</button>
				</li>
			)
		})
		return(
			<div>
				<h2>Your Resources:</h2>
				<h2>{userResources}</h2>
			</div>
		)
	}
}

export default Resources;