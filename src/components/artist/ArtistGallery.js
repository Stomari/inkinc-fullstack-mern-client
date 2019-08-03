import React from 'react';
import axios from 'axios';

const ArtistGallery = (props) => {

  const createFlash = () => {
    console.log('abre');
  }

  return(
    <div>
      {props.user.artistTattoo.map((el, idx) => {
        return (
        <div key={idx}>
          <img src={el.image} alt="TESTE"/>
          <p>{el.name}</p>
        </div>
        )
      })}
      <button onClick={() => createFlash()}>New Tattoo</button>
    </div>
    
  )
}

export default ArtistGallery;