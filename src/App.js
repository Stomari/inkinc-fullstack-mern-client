import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './stylesheets/App.css';
import './stylesheets/mainPage.css';
import './stylesheets/navbar.css';
import './stylesheets/auth.css';
import './stylesheets/profile.css';
import AuthService from './components/auth/auth-service';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/protected-routes'
//Components
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SearchPage from './components/search/SearchPage';
import Profile from './components/user/Profile';
import FolderDetail from './components/user/folder/FolderDetail';
import ArtistPage from './components/artist/ArtistPage';



//Victor
// import ByPlaceSearch from './components/places/ByPlaceSearch';
// import ByAddressSearch from './components/places/ByAddressSearch';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();

    console.log(process.env.REACT_APP_API_URL)
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  
  render() {
    this.fetchUser()
    console.log(this.state.loggedInUser);
    if(this.state.loggedInUser){
      return (
          <div className="App">
            <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
            <Switch>
              <Route exact path='/' render={() => <Home/>} />
              <Route exact path="/home" render={() => <Home user={this.state.loggedInUser}/>}/> 
              <Route path="/artists/:id" render={(props) => <ArtistPage user={this.state.loggedInUser} {...props} getUser={() => this.getTheUser()}/>} />
              <Route exact path='/search' render={() => <SearchPage user={this.state.loggedInUser}/>} />

              {/* Profile Pages */}
              <ProtectedRoute exact path='/profile' user={this.state.loggedInUser} component={Profile} /> 
              <ProtectedRoute exact path='/profile/folder/:id' user={this.state.loggedInUser} component={FolderDetail} /> 
            
            </Switch>
          </div>
        );
      } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>

          <Switch>
          <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>} />
          <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>} />
          <Route exact path='/' render={() => <Home/>} />
          <Route exact path='/search' render={() => <SearchPage/>} />
          <Route path='/artists/:id' render={(props) => <ArtistPage getUser={(e) => this.getTheUser(e)} {...props} />} />
            {/* <ProtectedRoute path='/home' user={this.state.loggedInUser} component={Home} /> */}
          </Switch>
        </div>
      )
    }
  }
}


export default App;
