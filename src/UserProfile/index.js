import React, { Component } from 'react';
import Resources from '../Resources';
import EditResource from '../EditResource'
import CreateResources from '../CreateResources';


class UserProfile extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			name:'',
			municipality:'',
			barrio:'',
			safety:'',
			resources: [],
			resourceToEdit: {
				_id:null,
				type: '',
				description:''
			},
			modalShowing: false
		}
	}

	componentDidMount(){
		this.getUser()
	}
	//API call to get user information. 
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

	editResource = async(e)=> {
		e.preventDefault();
		let resourceId = this.state.resourceToEdit._id
		//console.log(resourceId);
		//console.log('editResouce was called');
		//console.log('e.target');
		//console.log(e.target);
		
		try{
			const editedResource = await fetch(process.env.REACT_APP_SERVER_URL + '/api/v1/resources/' + resourceId + '/update', {
				method: 'PUT',
        		body: JSON.stringify(this.state.resourceToEdit),
        		headers: {
          			'Content-Type': 'application/json'
        		}
			});
			const parsedResource = await editedResource.json();
			//console.log(parsedResource + " parsedResource edit route");
			//console.log(this.state.resources + " resources array");
			const editedResourceArray = this.state.resources.map((resource) => {
				//console.log('editedResourceArray was called');
        		if(resource._id === this.state.resourceToEdit._id){
           		 	resource = parsedResource.data;
        		}
        		return resource
        	})
        	this.setState({
        		resources: editedResourceArray,
       			modalShowing: false
      		});
        

		}catch(err){
			console.log(err);
		}
	}

	getCreatedResorces = (resources)=>{
		this.setState({
			resources: [...this.state.resources, resources]
		})
		
	}

	handleFormChange = (e) => {
    	this.setState({
    		resourceToEdit: {
        		...this.state.resourceToEdit,
        		[e.target.name]: e.target.value
      	    }
    	})
  	}
  	
  	//Edit Modal function
  	showModal = (resourceToEdit) => {
   	 	console.log(resourceToEdit + '<-- in showModal')
    	this.setState({
     		modalShowing: true,
      		resourceToEdit:resourceToEdit
      		
    	});
  	}

  	deleteResource = async(resourceId, e) =>{
  		console.log('this is resource id');
  		console.log(resourceId);
  		e.preventDefault();
  		try {
  			const deletedResource = await fetch(process.env.REACT_APP_SERVER_URL + '/api/v1/resources/' + resourceId, {
  				method: 'DELETE'
  			})
  			await deletedResource.json();
  			this.setState({
  				resources: this.state.resources.filter((resource)=> resource._id !== resourceId)
  			})

  		}catch(err){
  			console.log(err + 'delete err');
  		}
  	}

	render(){

		return(
			<div>
				<h2>Profile</h2>
				<h4>Username: {this.state.username}</h4>
				<h4>Name: {this.state.name}</h4>
				<h4>Municipality: {this.state.municipality}</h4>
				<h4>Barrio: {this.state.barrio}</h4>

				{this.state.modalShowing ? <EditResource editResource={this.editResource} resourceToEdit={this.state.resourceToEdit} handleFormChange={this.handleFormChange}/> : null}
				
				<Resources resources={this.state.resources} userId={this.props.state.userId}showModal={this.showModal} delete={this.deleteResource}/>
				
				<CreateResources getCreatedResorces={this.getCreatedResorces}/>
				
				<button className="navButtons" onClick={this.props.displayResources}>All Resources in your area</button>
			</div>
		)
	}
}

export default UserProfile;