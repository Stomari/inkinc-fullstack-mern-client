import React from 'react';
import { Link } from 'react-router-dom';

const ArtistCard = (props) => {
  return(
    <li className="media fav-art-card pl-3">
      <img src={props.state.profileImg} className="mr-3 rounded-circle " alt="..."/>
      <div className="media-body">
        <div className="row">
          <h5 className="mt-0 ml-3"> {props.state.name}</h5>
        </div>
      </div>
      <hr/>
    </li>
    

  )
}

export default ArtistCard;