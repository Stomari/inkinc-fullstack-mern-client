/* eslint-disable no-unused-expressions */
import React from 'react';

const Tags = (props) => {
  return(
    <div>
      {props.categories.map((el, idx) => {
        return (
          <div key={idx} className="category-container">
            <label htmlFor={el._id}>{el.tag}</label>
            <input type="checkbox" id={el._id} value={el.id} onChange={(e) => props.chooseCategories(e)} />
          </div>
        );
      })}
    </div>
  );
}

export default Tags;