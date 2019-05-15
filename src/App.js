import React, { Component } from 'react';
import './App.css';
import Register from './Register';
import Login from './Login';
import UserProfile from './UserProfile'

class App extends Component {
  constructor(){
    super();
    this.state = {
      municipalities:[],
      barrios:[],
      username: '',
      userId: '',
      loggedIn: false
    }
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
  }
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


  render(){
    //console.log(process.env)
    //console.log(this.state.municipalities);
    console.log("app state: ", this.state)

    return (
      <div className="App">
        {this.state.loggedIn ? <h3>You are logged in!</h3> : null}
        <h1>YUCAJU-App</h1>
        <Register municipalities={this.state.municipalities} barrios={this.state.barrios} masterLogin={this.masterLogin} />
        <Login masterLogin={this.masterLogin} />
        <UserProfile/>
      </div>
    );
  }
}

export default App;
