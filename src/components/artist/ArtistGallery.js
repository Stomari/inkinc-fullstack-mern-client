import React from 'react';
import CreateTattooForm from './CreateTattooForm';
import axios from 'axios';

const ArtistGallery = (props) => {  
  return(
    <div>
      {props.artist.artistTattoo.map((el, idx) => {
        return (
        <div key={idx}>
          <img src={el.image} alt="TESTE"/>
          <p>{el.name}</p>
        </div>
        )
      })}
      {props.user && (props.user._id === props.artist._id) && <button onClick={() => props.handlerShowForm()}>New Tattoo</button>}
      {props.showForm && <CreateTattooForm {...props} />}
    </div>
    
  )
}

export default ArtistGallery;