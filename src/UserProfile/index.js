import React, { Component } from 'react';
import Resources from '../Resources'

class UserProfile extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			name:'',
			municipality:'',
			barrio:'',
			safety:'',
			resources: []
		}
	}
	componentDidMount(){
		this.getUser()
	}

	getUser = async() => {
		console.log('getUser');
		try{
			const userId = this.props.state.userId
			const foundUser = await fetch( process.env.REACT_APP_SERVER_URL + '/api/v1/users/' + userId)	
			if(foundUser.status !== 200){
        		throw Error(foundUser.statusText);
      		}
      		const parsedUser = await foundUser.json();
      		// console.log(parsedUser.data.resources + ' this is parsedUser');
      		this.setState({
      			username: parsedUser.data.username,
				name: parsedUser.data.name,
				municipality:parsedUser.data.municipality,
				barrio:parsedUser.data.barrio,
				resources: parsedUser.data.resources
      		})
		}catch(err){
			console.log(err)
		}
		

	}
	// getResources = async() =>{
	// 	console.log('getResources was called');
	// 	try {
	// 		const foundResources = await fetch(process.env.REACT_APP_SERVER_URL + '/api/v1/resources')
	// 		if(foundUser.status !== 200){
 //        		throw Error(foundUser.statusText);
 //      		}
 //      		const parsedResources = await foundResources.json();
 //      		console.log(parsedResources.data.resources); 
	// 	}catch(err){
	// 		console.log(err);
	// 	}
	// }
	render(){
		console.log("user profile resources: ")
		console.log(this.state.resources);
		return(
			<div>
				<h1>UserProfile</h1>
				<h2>Username: {this.state.username}</h2>
				<h2>Name: {this.state.name}</h2>
				<h2>Municipality: {this.state.municipality}</h2>
				<h2>Barrio: {this.state.barrio}</h2>
				<Resources resources={this.state.resources} userId={this.props.state.userId}/>
			</div>
		)
	}
}

export default UserProfile;