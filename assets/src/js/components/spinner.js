// Dependencies
import React from 'react';

const Spinner = () => {
  return(
    <div className="has-text-centered">
      <div className="lds-ellipsis"><div/><div/><div/><div/></div>
    </div>
  );
};

export default Spinner;
