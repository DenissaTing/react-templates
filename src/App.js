import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import logo from './logo.svg';
import './App.css';
import InputForm from './components/index'

class App extends Component {
  render(){
    return (
      <div className="App">
        <AppBar color="primary" position="static" >
          <h1 >Login</h1>
        </AppBar>
        <InputForm />
      </div>
    );
  }
}

export default App;

// Testing