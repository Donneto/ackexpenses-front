// Dependencies
import React from 'react';

// Custom
import Summary from '../components/summary';
import Actions from '../components/actions';
import DataTable from '../components/dataTable';
import moment from 'moment';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment(),
    };

    this._updateDates = this._updateDates.bind(this);
  }

  _updateDates(stDate, edDate) {
    let { startDate, endDate } = this.state;

    startDate = stDate;
    endDate = edDate;

    this.setState({startDate, endDate });
  }

  render() {
    const { startDate, endDate } = this.state;

    return(
      <div>
        <h1 className="title is-1 has-text-centered">Acklexpenses</h1>
        <br/>
        <div className="columns is-centered">
          <div className="column is-three-fifths box is-clearfix">
            <Summary startDate={startDate} endDate={endDate} updateDates={this._updateDates}/>
            <Actions/>
            <DataTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
