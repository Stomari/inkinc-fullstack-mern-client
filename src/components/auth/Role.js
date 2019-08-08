import React from 'react';

const Role = (props) =>{
  return(
    <div>
      {/* <h5 className={`${props.state.classe}`}> Are you an Artist or an Client?</h5> */}
      <div className="d-flex flex-wrap justify-content-center text-center role-custom">
        <div className={`hover-client ${props.state.classeCli} ml-3 mr-3 mb-3`}> 
          <div className="overlay-client d-flex justify-content-center">
           
            <button className={`p-3 text-uppercase info`} name='role' value='User' onClick={(event) => props.handleClass(event) }> Client </button >
          </div>
        </div>

        <div className={`hover-artist ${props.state.classeArt} ml-3 mr-3 mb-3`}> 
          <div className="overlay-artist d-flex justify-content-center">
        <button  className={`p-3 text-uppercase info`} name='role' value='Artist' onClick={(event) => props.handleForm(event) }> Artist </button>
          </div>
        </div>
        {/* <p  className={`p-3 text-uppercase mr-3 ml-3 ${props.state.classe} btn-image-client`} name='role' value='User' onClick={(event) => props.handleForm(event) }> Client </p> */}
        {/* <p  className={`p-3 text-uppercase mr-3 ml-3 ${props.state.classe} btn-image-artist`} name='role' value='Artist' onClick={(event) => props.handleForm(event)}> Artist</p> */}
      </div>
    </div>
  )
}

export default Role;