import React, { Component } from 'react';
import CreateResources from '../CreateResources';

class Resources extends Component {
	constructor(props){
		super();
		this.state = {
			resources: [],
		}
	}

	getCreatedResorces = (resources)=>{
		this.setState({
			resources: [...this.state.resources, resources]
		})
		
	}
	
	render(){
		// console.log(this.props.resources + "this.props.resources in Rsources Component");
		// console.log(this.props.userId);
		//console.log("this.state.resources: ");
		//console.log(this.state.resources);
		
		const oldResources = this.props.resources; 
		const allResources = oldResources.concat(this.state.resources);

		const userResources = allResources.map( (name,i )=> {
			console.log(name + " this is name in userResources");
			return(
				<li key={i} value={name}>
					<span>{name.type}</span><br/>
					<span>{name.description}</span><br/>
        			<button onClick={this.props.showModal.bind(null, name)}>Edit</button>
					<button>Delete</button>
				</li>
			)
		})
		return(
			<div>
				<CreateResources getCreatedResorces={this.getCreatedResorces}/>
				<h2>Your Resources:</h2>
				<h2>{userResources}</h2>
			</div>
		)
	}
}

export default Resources;