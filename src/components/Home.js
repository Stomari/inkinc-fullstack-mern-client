import React, { Component, Fragment } from 'react';

class Home extends Component {
  constructor(props){
    super(props);
  }

//   animateHeadline($headlines) {
//     $headlines.each(function(){
//        var headline = $(this);
//        //trigger animation
//        setTimeout(function(){ this.hideWord( headline.find('.is-visible') ) }, 2500);
//        //other checks here ...
//     });
//  }

//  hideWord($word) {
//   var nextWord = takeNext($word);
//   this.switchWord($word, nextWord);
//   setTimeout(function(){ this.hideWord(nextWord) }, animationDelay);
// }

// takeNext($word) {
//   return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
// }

// switchWord($oldWord, $newWord) {
//   $oldWord.removeClass('is-visible').addClass('is-hidden');
//   $newWord.removeClass('is-hidden').addClass('is-visible');
// }
  render(){
//  this.animateHeadline($('.cd-headline'));

      return(
        <Fragment>
          <section className='jumbotron jumbotron-fluid main-custom teste'>
            {/* <h1 class="cd-headline rotate-1">
              <span>My favourite food is</span>
              <span class="cd-words-wrapper">
                <b class="is-visible">pizza</b>
                <b>sushi</b>
                <b>steak</b>
              </span>
          </h1> */}
          <div className="cover-content">
            <h1 className="cover-title">Get inspired<br/>Get tattooed</h1>            
          </div>
          </section>

          <section className='about-custom d-flex justify-content-center'>

            <div className="card-deck home-custom">
              
              <div className="card d-flex align-items-center card-custom home-box">
                   <img src="/images/heart.svg" className="card-img-top home-img" alt="..."/>
                  <div className="card-body mt-4 d-flex align-items-end text-center">
                    <div className="col">
                    <h3 className="card-title text-uppercase">Find artists</h3>
                    <p className="card-text">Discover and follow your favorite artists to keep track of their work.</p>
                    </div>
                </div>
              </div>

              <div className="card d-flex align-items-center card-custom home-box">
                  <img src="/images/chat.svg" className="card-img-top home-img" alt="..."/>
                  <div className="card-body d-flex align-items-end text-center">
                  <div className="col">
                    <h3 className="card-title text-uppercase">Book Now?</h3>
                    <p className="card-text">Chat with your favorite artist to book a session or tell your ideas.</p>
                    </div>
                  </div>
                </div>

              <div className="card d-flex align-items-center card-custom home-box">
                  <img src="/images/tattoo-machine.svg" className="card-img-top home-img" alt="..."/>
                  <div className="card-body mt-4 d-flex align-items-end text-center">
                    <div className="col">
                    <h3 className="card-title text-uppercase">Get inspired</h3>
                    <p className="card-text">Don't really know what to ink? Browse trough our search to find some inspiration!</p>
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
              <img className="footer-logo" alt="ink inc logo" width='20%' src='/images/inktopus.svg' />

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