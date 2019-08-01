import React, { Component } from 'react';
import './App.css';
import AuthService from './components/auth/auth-service';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/auth/protected-routes'

//Components
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';

//Victor
import ByPlaceSearch from './components/places/ByPlaceSearch';


class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        console.log(response)
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser(userObj){
    console.log(userObj)
    this.setState({
      loggedInUser: userObj
    })
  }


  
  render() {
    this.fetchUser()
    console.log('oiekkk',this.state.loggedInUser)
    if(this.state.loggedInUser){
        return (
          <div className="App">
            <Navbar userInSession={this.state.loggedInUser} getUser={(e) => this.getTheUser(e)} />
            <Route exact path="/home" render={() => <Home user={this.state.loggedInUser} getUser={() => this.getTheUser()}/>}/> 
          </div>
        );
      } else {
    console.log('poxae',this.state.loggedInUser)

      return (
        <div className="App">
            <Navbar userInSession={this.state.loggedInUser} getUser={(e) => this.getTheUser(e)}/>

        {/* <ByPlaceSearch /> */}
          <Switch>
          <Route exact path="/signup" render={() => <Signup getUser={(e) => this.getTheUser(e)}/>} />
          <Route exact path='/login' render={() => <Login getUser={(e) => this.getTheUser(e)}/>} />
          {/* <ProtectedRoute path='/home' user={this.state.loggedInUser} component={Home} /> */}
          </Switch>
      </div>
      )
     }
  }
 }


export default App;
