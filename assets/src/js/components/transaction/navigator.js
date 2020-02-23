import React from 'react';
import { Link } from 'react-router-dom';

const AppNavigator = () => {
  return(
    <div className="row">
      <div className="columns">
        <div className="column buttons has-text-centered">
          <Link to="/category" className="button is-info  is-small">
            <span className="icon"><i className="mdi mdi-contain mdi-18px"/></span> <span><b>Categories</b></span><span className="icon"><i className="mdi mdi-arrow-right-circle mdi-18px"/></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppNavigator;
