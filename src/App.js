import React, { Component } from 'react';
import './App.css';
import Register from './Register';
import Login from './Login';
import UserProfile from './UserProfile';
import AllResources from './AllResources';

//APP.JS STATE IS USED TO RENDER REGISTER COMPONENT, LOGIN COMPONENT, USERPROFILE COMPONENT & ALLRESOURCES COMPONENT

class App extends Component {
  constructor(){
    super();
    this.state = {
      municipalities:[],
      barrios:[],
      username: '',
      userId: '',
      loggedIn: false,
      allUsersResources:'',
      showResources: false,
      showProfile: true
    }
  }

  displayResources = () => {
    // setState so that showResources is true AND showProfile is false 
    this.setState({
      showResources: true,
      showProfile:false
    })
  }

  displayProfile = () => {
    // setState so that showProfile is true AND showResources is false 
    this.setState({
      showProfile:true,
      showResources:false
    })
  }

  masterLogin = (username, userId) => {
    console.log("master login hit")
    this.setState({
      loggedIn: true,
      username: username,
      userId: userId
    })

  }
  masterLogout = () => {
    this.setState({
      loggedIn: false,
      username: '',
      userId: ''
    })

  }
  componentDidMount(){
    this.getMunicipalities();
    this.getBarrios();
    this.getAllUsersResources();
  }
  //THIS DATA WILL BE IN APP STATE AND USED IN REGISTER COMPONENT
  getMunicipalities = async()=>{
    try{
      const response = await fetch(process.env.REACT_APP_SERVER_URL + '/api/v1/auth/municipalities')
      if(response.status !== 200){
          throw Error(response.statusText);
      }
      const municipalitiesParsed = await response.json();
      const data = municipalitiesParsed.data
      const municipalityList= []
      data.forEach((element)=>{
        municipalityList.push(element.municipality);
            })
      const municipality = [...new Set(municipalityList)]
      this.setState({
        municipalities: municipality
      })

    }catch(err){
      console.log(err);
    }
  }
  //THIS DATA WILL BE IN APP STATE AND USED IN REGISTER COMPONENT
  getBarrios = async() =>{
    // I want to fetch barrios 
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + '/api/v1/auth/municipalities')
      if(response.status !== 200){
          throw Error(response.statusText);
      }
      const barriosParsed = await response.json();
      const data = barriosParsed.data
      //console.log(data + "this is barrios data")
      const barriosList = []
      data.forEach((element)=>{
        barriosList.push(element);
      })
      //console.log(barriosList);
      this.setState({
        barrios: barriosList
      })

    }catch(err){
      console.log(err);
    }
  }
  //THIS DATA WILL BE IN APP STATE AND USED IN THE ALLRESOURCES COMPONENT
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
    console.log(parseResource);
  }

  render(){
    //console.log(process.env)
    //console.log(this.state.municipalities);
    //console.log("app state: ", this.state)

    return (
      <div className="App">
        
        <h1>YUCAJU-App</h1>

        { this.state.loggedIn && this.state.showProfile ? <UserProfile state={this.state} displayResources={this.displayResources}/> : null}
        { this.state.loggedIn && this.state.showResources ? <AllResources state={this.state} displayProfile={this.displayProfile}/> : null }
       
        { !this.state.loggedIn ? <Register municipalities={this.state.municipalities} barrios={this.state.barrios} masterLogin={this.masterLogin}/> : null} 
        { !this.state.loggedIn ? <h3>- OR- </h3> : null }
        { !this.state.loggedIn ? <Login masterLogin={this.masterLogin}/> : null}
        
      </div>
    );
  }
}

export default App;
