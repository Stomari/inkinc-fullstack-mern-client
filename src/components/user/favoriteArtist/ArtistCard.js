import React from 'react';

const ArtistCard = (props) => {
  return(

    <li class="media">
      <img src={props.state.image} class="mr-3" alt="..."/>
      <div class="media-body">
        <h5 class="mt-0 mb-1"> {props.state.name}</h5>
        <button onClick={props.deleteArtist(props.state._id)}> Del </button>
      </div>
    </li>
    

  )
}

export default ArtistCard;