import React from 'react';

const CategoriesDisplay = (props) => {
  return(
    <div>
      <p className="text-uppercase">Styles</p>
        {
          props.category.map((e, idx) => {
            return(
              <p key={idx}>{e.tag}</p>
            )
          })
        }
    </div>
  )
}

export default CategoriesDisplay;