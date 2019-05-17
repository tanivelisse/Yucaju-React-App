import React, { Component } from 'react';

class AllResources extends Component {
	constructor(){
		super();
		this.state = {
			allUsersResources: ''
		}
	}
	componentDidMount(){
		this.getAllUsersResources()
	}
	getAllUsersResources = async()=> {
		let parseResource = null;
		try{
		const foundResources = await fetch(process.env.REACT_APP_SERVER_URL + '/api/v1/resources')
		parseResource = await foundResources.json();

		}catch(err){
			console.log(err);
		}
		this.setState({
			allUsersResources: parseResource.data
		})
	}
		
		// const displayAllResources = this.state.map((resource,i)=>{
		// 	return(
		// 		<li key={i} value={resource}>
		// 			<span>{resource.type}</span><br/>
		// 			<span>{resource.description}</span><br/>
		// 		</li>
		// 	)
		// })
	render(){
		console.log(this.state.allUsersResources);
		return(
			<div>
				<h2>All resources in the area</h2>
					
			</div>
		)
	}
}

export default AllResources;
