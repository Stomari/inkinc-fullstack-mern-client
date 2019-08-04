import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
      return(
        <Fragment>
          <section className='jumbotron jumbotron-fluid main-custom text-center'>
            <div className='container'>
              <h1>INK.inc</h1>
              <p class="lead">TESTE TESTE TESTE TESTE TESTE TESTE</p>
            </div>
          </section>
          <section className='about-custom'>

          </section>
        </Fragment>
      )
  }
}

export default Home;