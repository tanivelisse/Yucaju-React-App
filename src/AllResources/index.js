import React from 'react';

//THIS COMPONENT HAS ALL RESOURCES FROM ALL USERS FOR DISPLAY
//IT GET'S THE PROPS FROM APP.JS

const AllResources =(props)=> {
	
	//console.log('allUsersResources in AllResources Component');
	//console.log(props.state.allUsersResources);
	const resourcesToDisplay = props.state.allUsersResources;
	const displayAllResources = resourcesToDisplay.map((resource,i)=>{
		return(
			<li id="one-of-AllResources"key={i} value={resource}>
				<h3>Type: {resource.type}</h3>
				<span>Description: {resource.description}</span><br/>
			</li>
		)
	})
	
	return(
		<div className='AllResources'>
			<button className="navButtons" onClick={props.displayProfile}>Back to Profile</button>
			<h2>All resources in the area</h2>
				 {displayAllResources}	
			<button className="navButtons" onClick={props.displayProfile}>Back to Profile</button>
		</div>
	)

}

export default AllResources;
