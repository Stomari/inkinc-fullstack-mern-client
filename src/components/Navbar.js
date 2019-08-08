import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';
import 'bootstrap/dist/css/bootstrap.css';

class Navbar extends Component {
  constructor(props){
    super(props);

    this.state = { 
      loggedInUser: null,
      collapsed: true,
      isVisible: false
    };

    this.service = new AuthService();
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  // navbar collapse func
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
    //navbar collapse
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    if(this.state.loggedInUser){
      return(
        <nav className="navbar navbar-expand-lg navbar-dark nav-custom p-3">
          <Link className="navbar-brand" to='/'>
            Ink.inc
          </Link>

          <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${classOne} justify-content-center`}  id="navbarSupportedContent">
          {/* center of page */}
            <ul className="navbar-nav col-lg-10 d-flex justify-content-center">
              <li className="nav-item nav-item-custom">
                <Link to={`/artists/${this.state.loggedInUser._id}`} className="nav-link text-uppercase"> Artist </Link>
              </li>
              <li className="nav-item nav-item-custom">
                <Link to={'/search/artists'} className="nav-link text-uppercase">Find Artists</Link>
              </li>
              <li className="nav-item nav-item-custom">
                <Link to={'/search/tattoos'} className="nav-link text-uppercase">Get inspiration</Link>
              </li>
              <li className="nav-responsive-log nav-item nav-item-custom">
                <Link to='/profile' className="nav-link text-uppercase">Profile</Link>
              </li>
              <li className="nav-responsive-log nav-item nav-item-custom">
                <Link to='/' className="nav-link text-uppercase" onClick={() => this.logoutUser()}> Logout </Link>
              </li>
            </ul>
          {/* end of page */}
            <div className="navbar-nav">
              <div className="btn-group nav-responsive">
                <button type="button" className="btn btn-prof">
                <Link to='/profile' className="text-uppercase">Profile</Link>
                </button>
                  <button type="button" className="btn btn-prof dropdown-toggle dropdown-toggle-split " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  </button>
                  <div className="dropdown-menu dropdown-custom">
                  <Link to='/' className="nav-link text-uppercase dropdown-item" onClick={() => this.logoutUser()}> Logout </Link>
                  </div>

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
                <Link to='/search' className="nav-link text-uppercase" >Search</Link>         
              </li>
              <li className="nav-responsive-log nav-item nav-item-custom">
              <Link to='/signup' className="nav-link text-uppercase">Sign Up</Link>
              </li>
              <li className="nav-responsive-log nav-item nav-item-custom">
              <Link to='/login' className="nav-link text-uppercase">Log In</Link>
              </li>
            </ul>

            <div className="navbar-nav nav-responsive">
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