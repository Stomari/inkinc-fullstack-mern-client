import React from 'react';

const Role = (props) =>{
  return(
    // <p> Are you an Artist or an User?</p>
    <div>
      <button  className={`${props.state.classe}`} name='role' value='User' onClick={(event) => props.handleForm(event) }> User </button>
      <button  className={`${props.state.classe}`} name='role' value='Artist' onClick={(event) => props.handleForm(event)}> Artist</button>
    </div>
  )
}

export default Role;