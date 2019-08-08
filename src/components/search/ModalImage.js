import React from 'react';
import { Link } from 'react-router-dom';
import CreateFolder from '../user/folder/CreateFolder';

const ModalImage = (props) => {
  console.log('MODAL IMAGE', props)
  return(
    <div className="modal-wrapper">
      <span className="close-modal-btn" onClick={() => props.handleCloseModal()}></span>
        <div className="form-modal">
          <div className="row">
          <div className="col-lg-7">
            <img src={props.shownTattoo.image} className="modal-image" alt="..."/>
          </div> 
          <div className="col-lg-5">
            <div className="row">
              <img src={props.shownTattoo.artist.profileImg} alt="artist"/>
              <p>{props.shownTattoo.artist.name}</p>
            </div>
            <div>
              <div>
              {
                props.shownTattoo.artist.category.map(e => {
                  return <p> #{e.tag} </p>
                })
              }
              </div>
            </div>
            <div>
              <Link to={`/artists/${ props.shownTattoo.artist._id}`}>
              See more of this Artist
              </Link>
              <CreateFolder/>

            </div>
          </div>
          </div>
        </div>
        <div className="modal-bg" onClick={() => props.handleCloseModal()}></div>
    </div>
  );
}

export default ModalImage;