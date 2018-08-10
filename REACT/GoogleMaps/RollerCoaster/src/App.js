import React, { Component } from 'react';
import {Map,InfoWindow,Marker,GoogleApiWrapper} from 'google-maps-react';
import {elastic as Menu} from 'react-burger-menu';
import logo from './logo.svg';
import RollerCoaster from './RollerCoaster.svg';
import './App.css';
class App extends Component {
  state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

  onMarkerClick=(props,marker,e)=>this.setState({
    selectedPlace:props,
    activeMarker:marker,
    showingInfoWindow:true
  });

  test=(e)=>{
    var elements = document.getElementsByClassName('WithinTime');
    console.log(elements);
  }
  render() {
    var points=[
      {lat:42.02,lng:-77.01},
      {lat:42.03,lng:-77.02},
      {lat:41.03,lng:-77.04},
      {lat:42.05,lng:-77.02}
    ];

    return (
      <div className="App">
        <Menu>
          <h3>Find your ride</h3>
        <input type="text" className="filter" placeholder="Ex:6 flags"/>
         <hr/>


       <div className="container" height="10"> <span><img src={RollerCoaster} className="place-icon" alt="locations"/><span className="locations"> 21 lindisfarne Way </span></span>

         </div>
      <div className="space"></div>

    <div className="container" height="10"> <span><img  className="place-icon" src={RollerCoaster}  alt="locations"/><span className="locations"> 21 lindisfarne Way </span></span>

        </div>
     <div className="space"></div>
        </Menu>
        <header className="App-header">

          <span><span className="credit">Powered By React.js</span><img src={logo} className="App-logo" alt="logo" /></span>
        <h1 className="App-title">Find your ride!</h1>

      <span className="WithinTime">Within <select><option value="5">5</option></select> min <select><option value="DRIVE">Drive</option></select> of <input type="text" placeholder="Ex:California"/> <button type="button" onClick={this.test}>Go!</button></span>

        </header>
        <Map google={this.props.google}
          initialCenter={{
          lat:43.856098,
          lng: -79.337021
        }}
          zoom={15}>
        </Map> 
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyBNkc1Jx7eWA-9Q8ewT5CzVYSyeP5gdyK8")
})(App)
