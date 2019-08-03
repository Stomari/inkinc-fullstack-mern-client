import React from 'react';
import axios from 'axios';

const Flashes = (props) => {

  const createFlash = () => {
    console.log('abre');
  }

  return(
    <div>
      {props.user.flash.map((el, idx) => {
        return (
        <div key={idx}>
          <img src={el.image} alt={el.name}/>
          <p>{el.name}</p>
        </div>
        )
      })}
      {console.log(props.user)}
      {(props.user) && (props.user.role === 'Artist') && <button onClick={() => createFlash()}>Create Flash</button>}
    </div>
    
  )
}

export default Flashes;