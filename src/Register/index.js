import React, {Component} from 'react';

//REGISTER COMPONENT

class Register extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:'',
			name:'',
			municipality: '',
			barrio: '',
			alert:''
		}
	}

	handleChange = (e)=>{
		//console.log('handleChange has been called');
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	//DIFFERENT HANDLE SINCE IT DEPENDS ON MUNICIPLAITY TO GET BARRIOS OPTIONS FOR THE SELECT TAG
	handleBarrioChange =(e)=>{
		//console.log('handleBarrioChange has been called');
		this.setState({
			barrio: e.target.value
		})
	}

	handleSubmit = async (e) => {
		//console.log('handleSubmit has been called');
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

		//STATE IS LIFTED TO APP.JS
		if(parseResponse.data){
			this.props.masterLogin(parseResponse.data.username, parseResponse.data._id)
		} else if(parseResponse.message) {
			this.setState({
			alert: parseResponse.message
		})
		}
		
	}

	render(){
		//console.log(this.state.municipality);
		//console.log(this.props.barrios);

		//RENDERS MUNICIPALITIES DATA/ API CALL IN APP.JS

		const municipalityList = this.props.municipalities.sort().map((name, i) => {
			 return(<option key={i} value={name}> {name} </option>)
		})

		//RENDERS BARRIOS ACCORDING TO THE SELECTED MUNICIPALITY. 
		const barrioList = this.props.barrios.map((barrio,i)=>{
			//console.log(this.state.municipality);
			//console.log(name.municipality);
			if(barrio.municipality === this.state.municipality){
				let barriotOptionsList = [];
				barriotOptionsList.push(barrio.municipality)
				barriotOptionsList.sort()
				return( 
					<option key={i} value={barrio.name}> {barrio.name} </option> 
				)
			}
		});

		return (
			<div>
				<h3>Register</h3>
				<form onSubmit={this.handleSubmit}>
					<span>Username: </span>
					<input type="text" name='username' onChange={this.handleChange}/><br/>
					<span>Password: </span>
					<input type="password" name='password'  onChange={this.handleChange}/><br/>
					<span>Full Name: </span> 
					<input type='text' name='name' onChange={this.handleChange}/><br/>
					<span>Municipality: </span>
					<select name='municipality' placeholder='municipality' onChange={this.handleChange}>
						<option value="">Select Municipality</option>
							{ municipalityList }
					</select><br/>
					<span>Barrio: </span>
					<select name='barrio' onChange={this.handleBarrioChange}>
						<option value="">Select Barrio</option>
							{ barrioList }
					</select><br/>
					<button>Register</button>
					<p>{this.state.alert}</p>
				</form>
			</div>
		)
	}
}


export default Register;