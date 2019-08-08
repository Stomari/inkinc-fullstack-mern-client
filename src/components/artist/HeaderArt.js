import React from 'react';

const HeaderArt = (props) => {
  let classWrapper="not-user";
  classWrapper = props.user._id === props.artist._id ? 'upload-image-container' : 'not-user'
  return (
    <div className={`d-flex flex-column align-items-center ${classWrapper}`}>
      <div className="container-custom d-flex justify-content-center">
        <label htmlFor="upload-image">
          <figure className="snip1566">
            {
              props.image !== '' ?
              <img src={props.image} alt="sq-sample14" className="profile-image" />
              : <img src={props.artist.profileImg} alt="sq-sample14" className="profile-image" />  
            }
            {
              props.user._id === props.artist._id &&
              <figcaption>
                    <input id="upload-image" type="file" name="image" onChange={(e) => props.handleFileUpload(e)} />
                <span>UPLOAD</span>
              </figcaption>
            }
          </figure>
        </label>
      </div>
        <h2 className="pt-4 pb-4 text-uppercase">{props.artist.name}</h2>
    </div>
  )
}

export default HeaderArt;