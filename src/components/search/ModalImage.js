import React from 'react';
import { Link } from 'react-router-dom';

const ModalImage = (props) => {
  return(
    <div className="modal-wrapper">
      <span className="close-modal-btn" onClick={() => props.handleCloseModal()}></span>
        <div className="form-modal">
          <div className="row">
          <div className="col-lg-8">
            <img src={props.shownTattoo.image} className="modal-image" alt="..."/>
          </div> 
          <div className="col-lg-4 artist-modal-info flex-column">
            <h6 className="text-uppercase text-center">Done By</h6>
            <div className="row align-items-center modal-content-info">
              <img className="rounded-circle artist-modal-img" src={props.shownTattoo.artist.profileImg} alt="artist"/>
              <p className="pl-3">{props.shownTattoo.artist.name}</p>
            </div>
            <div>
              <div>
              {
                props.shownTattoo.artist.category.map(e => {
                  return <p> {e.tag} </p>
                })
              }
              </div>
            </div>
            <div className="text-center link-artist">
              {
                props.user ?
                <Link to={`/artists/${ props.shownTattoo.artist._id}`}>
                See more of this artist!
                </Link>
                :
                <Link to={'/signup'}>
                Sign up to see more!
                </Link>
              }
            </div>
          </div>
          </div>
        </div>
        <div className="modal-bg" onClick={() => props.handleCloseModal()}></div>
    </div>
  );
}

export default ModalImage;