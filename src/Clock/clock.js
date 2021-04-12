import React from 'react';
import "./clock.css";

class Clock extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        date: new Date()
      };
    }

    componentDidMount(){
      this.timerID = setInterval(() => {
        this.tick();
      }, 1000); 
    };

    componentWillUnmount(){
      clearInterval(this.tick());
    };

    tick(){
      this.setState({
        date: new Date()
      });
    }

    render() {
      return(
      <p className= "clock">{this.state.date.toLocaleTimeString('ar-US')}.</p>
      )
    }
}

export default Clock;