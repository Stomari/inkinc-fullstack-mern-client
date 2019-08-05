import React from 'react';

const Categories = (props) => {

  return(
    props.categories.map((el, idx) => {
      if (props.artist.category.includes(el)) {
        return (
          <div key={idx}>
            <input type="checkbox" id={el.tag} checked/>
            <label htmlFor={el.tag}>{el.tag}</label>
          </div>
        )
      } else if (props.user._id === props.artist._id && !props.artist.category.includes(el)){
        return (
          <div key={idx}>
            <input type="checkbox" id={el.tag} />
            <label htmlFor={el.tag}>{el.tag}</label>
          </div>
        )
      }
    })
  )
}

export default Categories;