import React from 'react';

const actions = () => {
  return(
    <div className="box ">
      <div className="buttons is-centered ">
        <button className="button is-danger is-outlined is-small is-rounded"><span className="icon"><i className="mdi mdi-cash-usd mdi-18px"/></span> <span><b>Expense</b></span></button>
        <button className="button is-primary is-outlined is-small is-rounded"><span className="icon"><i className="mdi mdi-plus-box mdi-18px"/></span> <span><b>Income</b></span></button>
        <button className="button is-info is-outlined is-small is-rounded"><span className="icon"><i className="mdi mdi-contain mdi-18px"/></span> <span><b>Categories</b></span></button>
      </div>
    </div>
  );
};

export default actions;
