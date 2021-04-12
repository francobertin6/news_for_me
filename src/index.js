import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './App';
import Navigation from './Components/navigation';
import Body from "./body/body";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Navigation /> 
    <Body />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
