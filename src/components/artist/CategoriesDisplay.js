import React from 'react';

const CategoriesDisplay = (props) => {
  return(

    <div>
      <p className="text-uppercase"> Styles </p>
        {
          props.state.category.map(e => {
            return(
              <p> e.tag</p>
            )
          })
        }
    </div>
  )
}

export default CategoriesDisplay;