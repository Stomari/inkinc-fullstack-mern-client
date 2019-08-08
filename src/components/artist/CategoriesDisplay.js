import React from 'react';

const CategoriesDisplay = (props) => {
  return(
    <div className="styles-info ">
      <h6 className="text-uppercase">Styles</h6>
          <div className="style-content d-flex justify-content-center row">
        {
            props.category.map((e, idx) => {
              return(
                <p className="pr-3" key={idx}><span className="hashtag">#</span>{e.tag}</p>
              )
            })
          }
          </div>
    </div>
  )
}

export default CategoriesDisplay;