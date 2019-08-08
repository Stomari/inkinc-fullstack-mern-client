import React from 'react';

const Header = (props) => {
  return (
    <div className={"d-flex flex-column upload-image-container"}>
      <div className="container-custom d-flex">
        <figure className="snip1566">
          <label htmlFor="upload-image">
              {
                props.image !== '' ?
                <img src={props.image} alt="sq-sample14" className="profile-image" />  
                : <img src={props.user.profileImg} alt="sq-sample14" />
              }
              {
                <figcaption>
                      <input id="upload-image" type="file" name="image" onChange={(e) => props.handleFileUpload(e)} />
                  <span>UPLOAD</span>
                </figcaption>
              }
          </label>
        </figure>
      </div>
      <h2 className="pt-4 pb-4 text-uppercase">{props.user.name}</h2>
    </div>
  )
}

export default Header;