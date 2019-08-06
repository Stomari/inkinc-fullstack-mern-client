import React from 'react';

const ShowMansory = (props) => {
  return(
    <div className="search-grid-image-wrapper">
      <img width="100%" src={props.data.image} alt={props.data.tag} className="search-grid-image" />
      {props.user && props.user.role === 'User' && <div className="search-grid-overlay" onClick={(event, i) => props.openedImageSaveHandler(event, props.data._id)}>+</div>}
    </div>
  );
}

export default ShowMansory;