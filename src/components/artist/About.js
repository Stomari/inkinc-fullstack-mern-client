import React from 'react';

const About = (props) => {

  return(
    <div className="about pt-4 text-center">
      <p className="text-uppercase"> About Me </p>
      {props.artist.about}
    </div>

  )
}

export default About;