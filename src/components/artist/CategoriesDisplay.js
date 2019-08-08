import React from 'react';

const CategoriesDisplay = (props) => {
  return(
    <div>
      <p className="text-uppercase"> Styles </p>
        {
          props.category.map(e => {
            return(
              <p>{e}</p>
            )
          })
        }
    </div>
  )
}

export default CategoriesDisplay;