import React from 'react';

const Role = (props) =>{
  return(
    <div>
    <h5 className={`${props.state.classe}`}> Are you an Artist or an Client?</h5>
    <div className="d-flex justify-content-center">
      <button  className={`btn btn-custom mr-5 p-3 text-uppercase ${props.state.classe}`} name='role' value='User' onClick={(event) => props.handleForm(event) }> Client </button>
      <button  className={`btn btn-custom p-3 text-uppercase ${props.state.classe}`} name='role' value='Artist' onClick={(event) => props.handleForm(event)}> Artist</button>
    </div>
    </div>
  )
}

export default Role;