import React from 'react';

const ArtistCard = (props) => {
  return(
    <li className="media fav-art-card pl-3">
      <img src={props.state.profileImg} className="mr-3 rounded-circle " alt="artist"/>
      <div className="media-body">
        <div className="row">
          <h5 className="mt-3 ml-3"> {props.state.name}</h5>
        </div>
      </div>
    </li>


  )
}

export default ArtistCard;