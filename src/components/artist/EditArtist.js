import React from 'react';
import axios from 'axios';

const EditArtist = (props) => {

  const handleCloseModal = () => {
    props.handleShowEditProfile();
    props.getArtist();
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/edit-artist', props.state, {withCredentials: true})
      .then(() => {
        props.getArtist();
        props.handleShowEditProfile();

      })
      .catch(err => console.log(err));
  }

  return(
    <div>
      <button onClick={() => props.handleShowEditProfile()}>Edit Profile</button>
      {
        props.showEditProfileForm && 
        <div className="modal-wrapper">
        <span className="close-modal-btn" onClick={(e) => handleCloseModal(e)}></span>
        <form onSubmit={(event) => handleFormSubmit(event)} className="form-modal">
          <label>Name:</label>
          <input type="text" name="name" value={props.state.name} onChange={ (event) => props.handleChange(event)}/>
          <label>About:</label>
          <input type="text" name="about" value={props.state.about} onChange={ (event) => props.handleChange(event)}/>
          <label>Category:</label>
          <div className="categories-container">
            {props.categories.map((el, idx) => {
              let check = false;
              if (props.state.category.some(cat => cat === el._id)) check = true;
              return (
                <div key={idx} className="category-container">
                  <input id={el.tag} type="checkbox" name="category" value={el._id} checked={check} onChange={ (event) => props.handleChangeCheckbox(event)} />
                  <label htmlFor={el.tag}>{el.tag}</label>
                </div>
              );
            })}
          </div>
          {
            props.state.workplace.map((el, idx) => {
             return <p key={idx}><strong>{el.name}</strong> - {el.address}</p>
            })
          }
          <input type="submit" value="Submit" />
        </form>
        <div className="modal-bg" onClick={(e) => handleCloseModal(e)}></div>
      </div>
      }
    </div>
  )

}

export default EditArtist;