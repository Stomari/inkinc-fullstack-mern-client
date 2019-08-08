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
              <h1>INK.inc</h1>
            </div>
          </section>

          <section className='about-custom d-flex justify-content-center'>

            <div className="card-deck home-custom">
              
              <div className="card d-flex align-items-center card-custom">
                   <img src="/images/dribbble-show-series-1-7-05.png" className="card-img-top home-img pt-4" alt="..."/>
                  <div className="card-body mt-4 text-center">
                    <h5 className="card-title text-uppercase">Find artists</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural </p>
                </div>
              </div>

              <div className="card d-flex align-items-center card-custom">
                  <img src="/images/balloon.png" className="card-img-top home-img " alt="..."/>
                  <div className="card-body text-center">
                    <h5 className="card-title text-uppercase">Get inspired</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural.</p>
                  </div>
                </div>

              <div className="card d-flex align-items-center card-custom">
                  <img src="/images/mail.png" className="card-img-top home-img" alt="..."/>
                  <div className="card-body mt-4 text-center">
                    <h5 className="card-title text-uppercase">Book Now?</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural </p>
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