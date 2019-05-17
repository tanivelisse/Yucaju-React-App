import React, {Component} from 'react';

class Login extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:''
		}
	}
	handleChange = (e)=>{
		console.log('handleChange was called');
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = async(e)=>{
		console.log('handleSubmit was called');
		e.preventDefault();
		let parseResponse = null;
		try {
			const logResponse = await fetch(process.env.REACT_APP_SERVER_URL + '/api/v1/auth/login',{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			parseResponse = await logResponse.json();
			console.log(logResponse + ' logResponse');
		}catch(err){
			console.log(err);
		}
		this.props.masterLogin(parseResponse.data.username, parseResponse.data._id)
	}
	render(){
		return(
			<div>
				<h3>Login</h3>
			 	<form onSubmit={this.handleSubmit}>
        			Username:
        			<input type='text' name='username' onChange={this.handleChange}/><br/>
        			Password:
        			<input type='password' name='password' onChange={this.handleChange}/><br/>
       				<button type='sumbit'>Login</button>
      			</form>
			</div>
		)
	}
}

export default Login;