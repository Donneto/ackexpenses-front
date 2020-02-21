// Dependencies
import React from 'react';

// Custom
import Summary from '../components/summary';
import Actions from '../components/actions';
import DataTable from '../components/dataTable';

class Home extends React.Component {

  render() {
    return(
      <div>
        <h1 className="title is-1 has-text-centered">AcklenExpenses</h1>
        <br/>
        <div className="columns is-centered">
          <div className="column is-three-fifths box">
            <Summary/>
            <Actions/>
            <DataTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
