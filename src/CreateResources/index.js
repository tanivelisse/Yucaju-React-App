import React, { Component } from 'react';

class CreateResources extends Component {
	constructor(){
		super();
		this.state = {
			type: '',
			description:''
		}
	}
	handleChange = (e)=>{
		this.setState({
			[e.target.name]: e.target.value
		})
	} 
	handleSubmit = async(e) =>{
		e.preventDefault();
		let parseResource = null;
		try {
			const createdResource = await fetch(process.env.REACT_APP_SERVER_URL + '/api/v1/resources/new', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			parseResource = await createdResource.json();
			console.log(parseResource);
		}catch(err){
			console.log(err);
		}
		this.props.getCreatedResorces(parseResource.data);
	}
	render(){
		//console.log(this.state);
		return(
			<div>
				<h1>Create Resource</h1>
				<form onSubmit={this.handleSubmit}>
					Type:
					<input type='text' name='type'onChange={this.handleChange}/><br/> 
					Description:
					<textarea name='description' onChange={this.handleChange}/><br/>
					<button>Create</button>
				</form>
			</div>
		)
	}
}

export default CreateResources;