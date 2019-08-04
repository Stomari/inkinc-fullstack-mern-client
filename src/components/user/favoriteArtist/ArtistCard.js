import React from 'react';

const ArtistCard = (props) => {
  return(
    <div>
      <p>oie</p>
      <picture>
        <img src={props.state.image} alt=''/>
      </picture>
      <p>
      {props.state.name}
      </p>
    </div>
  )
}

export default ArtistCard;