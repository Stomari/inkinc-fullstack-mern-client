import React from 'react';
import CreateFlashForm from './CreateFlashForm';
import axios from 'axios';

const Flashes = (props) => {

  
  const showFlashes = () => {
    return (
      props.artist.flash.map((el, idx) => {
        return (
          <div key={idx}>
            <img src={el.image} alt={el.name}/>
            <p>{el.name}</p>
          </div>
        )
      })
      )
    }

    return(
      <div>
      {props.artist.flash.length > 0 ? showFlashes() : null}
      {props.user && (props.user._id === props.artist._id) &&  <button onClick={() => props.handlerShowForm()}>New Flash</button>}
      {props.showForm && <CreateFlashForm {...props} />}
    </div>
    
  )
}

export default Flashes;