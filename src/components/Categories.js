/* eslint-disable no-unused-expressions */
import React from 'react';

const Tags = (props) => {
  return(
    <div className="categories-container">
      {props.categories.map((el, idx) => {
        return (
          <div key={idx} className="category-container">
            <input type="checkbox" id={el._id} value={el.id} onChange={(e) => props.chooseCategories(e)} />
            <label id="category-btn" htmlFor={el._id}>{el.tag}</label>
          </div>
        );
      })}
    </div>
  );
}

export default Tags;