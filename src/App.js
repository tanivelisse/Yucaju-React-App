import React, { Component } from 'react';
import './App.css';
import Register from './Register'

class App extends Component {
  constructor(){
    super();
    this.state = {
      municipalities:[],
      barrios:[]
    }
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
      console.log(barriosList);
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
    return (
      <div className="App">
        <h1>YUCAJU-App</h1>
        <Register municipalities={this.state.municipalities} barrios={this.state.barrios}/>
      </div>
    );
  }
}

export default App;
