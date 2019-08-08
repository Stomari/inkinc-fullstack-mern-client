import React from 'react';

const ShowMansory = (props) => {

  return(
    <div className="search-grid-image-wrapper">
      <img width="100%" src={props.data.image} alt={props.data.tag} className="search-grid-image" onClick={(event, i, modal) => props.openedImageSaveHandler(event, props.data._id, 'image')}/>
      {props.user && props.user.role === 'User' && <div className="search-grid-overlay" onClick={(event, i, modal) => props.openedImageSaveHandler(event, props.data._id, 'folder')}>+</div>}
    </div>

    
  );
}

export default ShowMansory;