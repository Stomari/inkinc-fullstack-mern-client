import React, { Component, Fragment } from 'react';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
      return(
        <Fragment>
          <section className='jumbotron jumbotron-fluid main-custom'>
            <div className='container'>
          <div className="cover-content">
            <img className="logo-main col-lg-8" alt="ink inc logo" width='20%' src='/images/inktopus.svg' />
            </div>

            </div>
          </section>

          <section className='about-custom d-flex justify-content-center'>

            <div className="card-deck home-custom">
              
              <div className="card d-flex align-items-center card-custom">
                   <img src="/images/heart.svg" className="card-img-top home-img" alt="..."/>
                  <div className="card-body mt-4 d-flex align-items-end text-center">
                    <div className="col">
                    <h5 className="card-title text-uppercase">Find artists</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural </p>
                    </div>
                </div>
              </div>

              <div className="card d-flex align-items-center card-custom">
                  <img src="/images/chat.svg" className="card-img-top home-img" alt="..."/>
                  <div className="card-body d-flex align-items-end text-center">
                  <div className="col">
                    <h5 className="card-title text-uppercase">Get inspired</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural.</p>
                    </div>
                  </div>
                </div>

              <div className="card d-flex align-items-center card-custom">
                  <img src="/images/tattoo-machine.svg" className="card-img-top home-img" alt="..."/>
                  <div className="card-body mt-4 d-flex align-items-end text-center">
                    <div className="col">
                    <h5 className="card-title text-uppercase">Book Now?</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural </p>
                  </div>
                </div>
                </div> 

            </div>

          </section>

          <footer className="footer">
            <div className="row footer-content">

              <div className="icons col-lg-6">
                <img src="images/instagram-brands.svg"/>
                <img src="images/facebook-brands.svg"/>
                <img src="images/twitter-brands.svg"/>
              </div>
              <img className="cover-logo" alt="ink inc logo" width='20%' src='/images/inktopus.svg' />

              <div className="col-lg-6 d-flex justify-content-end">
                <p className="text-footer"> © 2019 Ink.inc</p>
              </div>

            </div>
          </footer>
        </Fragment>
      )
  }
}

export default Home;