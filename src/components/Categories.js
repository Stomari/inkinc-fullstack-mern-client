/* eslint-disable no-unused-expressions */
import React from 'react';
import MediaQuery from 'react-responsive';

const Tags = (props) => {
  return (
    <div className="categories-container">
      <MediaQuery maxWidth={500}>
        {(matches) => {
          if (matches) {
            return <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Categories
                      </button>
                      <div className="dropdown-menu container-dropdown" aria-labelledby="dropdownMenu2">
                      {
                        props.categories.map((el, idx) => {
                        return (
                          <div key={idx} className="category-container">
                            <input type="checkbox" id={el._id} value={el.id} onChange={(e) => props.chooseCategories(e)} />
                            <label id="category-btn" htmlFor={el._id}>{el.tag}</label>
                          </div>
                          );
                        })
                      }
                      </div>
                    </div>

          } else {
            return props.categories.map((el, idx) => {
              return (
                <div key={idx} className="category-container">
                  <input type="checkbox" id={el._id} value={el.id} onChange={(e) => props.chooseCategories(e)} />
                  <label id="category-btn" htmlFor={el._id}>{el.tag}</label>
                </div>
              );
            })
          }
        }}
      </MediaQuery>
    </div>
  );
}

export default Tags;