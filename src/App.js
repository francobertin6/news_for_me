import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Clock from './Clock/clock';

let fecha = new Date();

class Header extends Component {
  render(){
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>News For Me</h1>
          <p className = "fecha">{fecha.getDate()}/{fecha.getMonth() + 1}/{fecha.getFullYear()}</p>
          <Clock />
        </header>
      </div>
    );
  }
}

export default Header;

