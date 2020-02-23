import React from 'react';

const CategoryItem = (props) => {
  return(
    <button className="button is-danger is-rounded is-small" onClick={() => props.delete(props.item._id)}>
      <b>
        <span className="is-capitalized">{props.item.name}</span>
        <span className="icon is-medium"><i className="mdi mdi-close-box"/></span>
      </b>
    </button>
  );
};

export default CategoryItem;
