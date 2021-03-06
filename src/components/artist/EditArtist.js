import React from 'react';
import axios from 'axios';
import MediaQuery from 'react-responsive';

const EditArtist = (props) => {

  const handleCloseModal = () => {
    props.handleShowEditProfile();
    props.getArtist();
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/api/edit-artist`, props.state, { withCredentials: true })
      .then(() => {
        props.getArtist();
        props.handleShowEditProfile();

      })
      .catch(err => console.log(err));
  }

  return (
    <div className="justify-self-end">
      <img className="edit-ico" onClick={() => props.handleShowEditProfile()} src="/images/edit-solid.svg" />
      {
        props.showEditProfileForm &&
        <div className="modal-wrapper">
          <span className="close-modal-btn" onClick={(e) => handleCloseModal(e)}></span>
          <form onSubmit={(event) => handleFormSubmit(event)} className="form-modal">
            <label className="text-uppercase label-cat">Name:</label>
            <input type="text" name="name" value={props.state.name} onChange={(event) => props.handleChange(event)} />
            <label className="text-uppercase label-cat">About:</label>
            <textarea type="text" name="about" rows={6} value={props.state.about} onChange={(event) => props.handleChange(event)} />
            <label className="text-uppercase label-cat">Category:</label>
            <div className="categories-container">
              <MediaQuery maxWidth={500}>
                {(matches) => {
                  if (matches) {
                    return <div className="dropdown text-center">
                      <button className=" dropdown-toggle dropdown-modal" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Categories
                      </button>
                      <div className="dropdown-menu container-dropdown text-center" aria-labelledby="dropdownMenu2">
                        {props.categories.map((el, idx) => {
                          let check = false;
                          if (props.state.category.some(cat => cat === el._id)) check = true;
                          return (
                            <div key={idx} className="category-container">
                              <input id={el.tag} type="checkbox" name="category" value={el._id} checked={check} onChange={(event) => props.handleChangeCheckbox(event)} />
                              <label htmlFor={el.tag}>{el.tag}</label>
                            </div>
                          );
                        })
                        }
                      </div>
                    </div>

                  } else {
                    return props.categories.map((el, idx) => {
                      let check = false;
                      if (props.state.category.some(cat => cat === el._id)) check = true;
                      return (
                        <div key={idx} className="category-container">
                          <input id={el.tag} type="checkbox" name="category" value={el._id} checked={check} onChange={(event) => props.handleChangeCheckbox(event)} />
                          <label htmlFor={el.tag}>{el.tag}</label>
                        </div>
                      );
                    })
                  }
                }}
              </MediaQuery>
            </div>

            <input className="btn-submit align-self-center" type="submit" value="Submit" />
          </form>
          <div className="modal-bg" onClick={(e) => handleCloseModal(e)}></div>
        </div>
      }
    </div>
  )

}

export default EditArtist;