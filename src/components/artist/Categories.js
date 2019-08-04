import React from 'react';

const Categories = (props) => {
  return(
    // props.user.name
    props.categories.map((el, idx) => {
      if (props.user.category.includes(el)) {
        return (
          <div key={idx}>
            <input type="checkbox" id={el.tag} checked/>
            <label forHtml={el.tag}>{el.tag}</label>
          </div>
        )
      } else {
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