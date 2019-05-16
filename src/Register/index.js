import React, {Component} from 'react';

class Register extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:'',
			name:'',
			municipality: '',
			barrio: ''
		}
	}
	handleChange = (e)=>{
		console.log('handleChange has been called');
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleBarrioChange =(e)=>{
		console.log('handleBarrioChange has been called');
		this.setState({
			barrio: e.target.value
		})
	}
	handleSubmit = async (e) => {
		console.log('handleSubmit has been called');
		e.preventDefault();
		let parseResponse = null;
		try {
			const regResponse = await fetch(process.env.REACT_APP_SERVER_URL + '/api/v1/auth/register', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}

			})
			parseResponse = await regResponse.json();
        	console.log(parseResponse);

		}catch(err){
			console.log(err);
		}

		this.props.masterLogin(parseResponse.data.username, parseResponse.data._id)
	}
	render(){
		//console.log(this.state.municipality);
		//console.log(this.props.barrios);

		const municipalityList = this.props.municipalities.map((name, i) => {
			//console.log(name + " name element in municipalityList");
			//console.log(i);
			 return(<option key={i} value={name}> {name} </option>)
		})
		//when the municiplaity is set, the barrios will display
		const barrioList = this.props.barrios.map((name,i)=>{
			//console.log(this.state.municipality);
			//console.log(name.municipality);
			if(name.municipality === this.state.municipality){
				return( <option key={i} value={name.barrio}> {name.barrio} </option> )
			}
		})

		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					Username:
					<input type="text" name='username' onChange={this.handleChange}/><br/>
					Password:
					<input type="password" name='password'  onChange={this.handleChange}/><br/>
					Full Name:
					<input type='text' name='name' onChange={this.handleChange}/><br/>
					Municipality:
					<select name='municipality' placeholder='municipality' onChange={this.handleChange}>
						{ municipalityList }
					</select><br/>
					Barrio:
					<select name='barrio' onChange={this.handleBarrioChange}>
						{ barrioList }
					</select><br/>
					<button>Register</button>
				</form>
			</div>
		)
	}
}


export default Register;