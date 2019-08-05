import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class Navbar extends Component {
  constructor(props){
    super(props);

    this.state = { 
      loggedInUser: null,
      collapsed: true
    };

    this.service = new AuthService();
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
    toggleNavbar(){
      this.setState({
      collapsed: !this.state.collapsed
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
  }

  render(){
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    if(this.state.loggedInUser){
      return(
        <nav className="navbar navbar-expand-lg navbar-dark nav-custom">
          <Link className="navbar-brand" to='/'>
          {/* <img src="/docs/4.3/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""/> */}
          Ink.inc
          </Link>
        <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${classOne} justify-content-center`}  id="navbarSupportedContent">
          <ul className="navbar-nav col-lg-10">
            <li className="nav-item nav-item-custom">
              <Link to='/artist' className="nav-link text-uppercase"> Artist </Link>
            </li>
            
          </ul>
          <div className="navbar-nav">
            <button className="btn-logout">
              <Link to='/profile' className="nav-link text-uppercase">Profile</Link>
            </button>
          <div>
            <Link to='/' className="nav-link text-uppercase" onClick={() => this.logoutUser()}> Logout </Link>
          </div>
        </div>
          </div>
        </nav>
       
      )
    } else if(this.state.loggedInUser === null){
     return( 
        <nav className="nav-style">
        
        </nav>
     )} else {
      return ( 
        <nav className="navbar navbar-expand-lg navbar-dark nav-custom p-3">
          <Link className="navbar-brand" to='/'>
          {/* <img src="/docs/4.3/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""/> */}
          Ink.inc
          </Link>
          <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${classOne} justify-content-center`}  id="navbarSupportedContent">
            <ul className="navbar-nav col-lg-10">
              <li className="nav-item nav-item-custom">
                <Link to='/artist' className="nav-link text-uppercase"> Artist </Link>
              </li>
              
            </ul>
            <div className="navbar-nav">
            <button className="btn-log mr-3">
                <Link to='/signup' className="nav-link text-uppercase">Sign Up</Link>
              </button>
              <button className="btn-log">
                <Link to='/login' className="nav-link text-uppercase">Log In</Link>
              </button>
            </div>
          </div>
        </nav>
      )
    }
  }

 
}

export default Navbar;