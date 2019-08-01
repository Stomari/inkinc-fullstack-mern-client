
import React, { Component } from 'react';

const Home = () => {
  
    return(
      <div>
        <Link to='/'>
          <button onClick={() => this.logoutUser()}>Logout</button>
        </Link>
      </div>
    )
  
}

export default Login;