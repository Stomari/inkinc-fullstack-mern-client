import React from 'react';
import { Link } from 'react-router-dom';

const ArtistCard = (props) => {
  return(
    <li class="media fav-art-card pl-3">
      <img src={props.state.profileImg} class="mr-3 rounded-circle " alt="..."/>
      <div class="media-body">
        <div className="row">
          <h5 class="mt-0 ml-3"> {props.state.name}</h5>
        </div>
      </div>
      <hr/>
    </li>
    

  )
}

export default ArtistCard;