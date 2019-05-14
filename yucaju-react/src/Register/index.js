import React, {Component} from 'react';

class Register extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:'',
			name:'',
			municipality: [],
			barrio: ''
		}
	}
	handleChange = (e)=>{
		console.log('handleChange has been called');
	}
	handleSubmit = (e)=>{
		console.log('handleSubmit has been called');

	}
	render(){
		console.log(this.props.municipalities);

		const municipalityList = this.props.municipalities.map( (name, i) => {
			return ( <option key={i} value={name}> {name} </option> )
		})

		return (
			<div>
			<h1>Register</h1>
			<form>
			Username:
			<input type="text" name='username' onChange={this.handleChange}/><br/>
			Password:
			<input type="password" name='password' onChange={this.handleChange}/><br/>
			Full Name:
			<input type='text' name='name' onChange={this.handleChange}/><br/>
			Municipality:
			<select multiple={true} value={this.state.municipality} onChange={this.handleChange}>
				{ municipalityList }
			</select><br/>
			Barrio:
			<select name='barrio'>
			<option name='barrios' value='barrios'></option>
			</select>
			</form>
			</div>
			)
	}
}


export default Register;