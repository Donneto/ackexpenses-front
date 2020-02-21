import React from 'react';

const summary = (props) => {
  return(
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Date</p>
          <p className="title is-5">20/10/2020 - 20/10/2020</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Income</p>
          <p className="title is-5">0</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Expenses</p>
          <p className="title is-5">300.50</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Balance</p>
          <p className="title is-5">-300.50</p>
        </div>
      </div>
    </nav>
  );
};

export default summary;
