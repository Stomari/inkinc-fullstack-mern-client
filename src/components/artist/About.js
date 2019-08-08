import React from 'react';

const About = (props) => {

  return(
    <div className="about pt-4 text-center about-sec">
      <h6 className="text-uppercase"> About Me </h6>
      <p>
      {props.artist.about}
      </p>
    </div>

  )
}

export default About;