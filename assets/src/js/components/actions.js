import React from 'react';

const actions = () => {
  return(
    <div className="box ">
      <div className="buttons is-centered ">
        <button className="button"><span className="icon "><i className="mdi mdi-video-4k-box mdi-24px"/></span> <span>Add Expense</span></button>
        <button className="button">Add Income</button>
        <button className="button">Select Past Dates</button>
        <button className="button">Categories</button>
      </div>
    </div>
  );
};

export default actions;
