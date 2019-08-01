import React from 'react';

const Role = (props) =>{
  console.log(props)

  return(
    // <p> Are you an Artist or an User?</p>
    <div>
      <button  name='role' value='User' onClick={(event) => props.handleChange(event)}> User </button>
      <button  name='role' value='Artist' onClick={(event) => props.handleChange(event)}> Artist</button>
    </div>
  )
}

export default Role;