import React from 'react';

const Categories = (props) => {
  return(
    <div className="categories-container">
      {props.categories.map((el, idx) => {
        if (props.artist.category.includes(el)) {
          return (
            <div key={idx}>
              <input type="checkbox" id={el.tag} checked/>
              <label htmlFor={el.tag}>{el.tag}</label>
            </div>
          )
        }
        if (props.showAllCategories && props.user._id === props.artist._id && !props.artist.category.includes(el)){
          return (
            <div key={idx} className="categories-container">
              <input type="checkbox" id={el.tag} />
              <label htmlFor={el.tag}>{el.tag}</label>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Categories;