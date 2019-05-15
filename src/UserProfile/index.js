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
			resources:[]
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
        	// for http errors, Fetch doesn't reject the promise on 404 or 500
        		throw Error(foundUser.statusText);
      		}
      		const parsedUser = await foundUser.json();
      		console.log(parsedUser.data.username + 'this is parsedUser');
      		this.setState({
      			username: parsedUser.data.username,
				name: parsedUser.data.name,
				municipality:parsedUser.data.municipality,
				barrio:parsedUser.data.barrio
      		})
		}catch(err){
			console.log(err)
		}
		

	}
	render(){
		//console.log(this.state);
		return(
			<div>
				<h1>UserProfile</h1>
				<h2>Username: {this.state.username}</h2>
				<h2>Name: {this.state.name}</h2>
				<h2>Municipality: {this.state.municipality}</h2>
				<h2>Barrio: {this.state.barrio}</h2>
				<Resources/>
			</div>
		)
	}
}

export default UserProfile;