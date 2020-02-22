// Dependencies
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import config from 'react-global-configuration';


// Custom
import Summary from '../components/summary';
import Actions from '../components/actions';
import DataTable from '../components/dataTable';
import Spinner from '../components/spinner';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment(),
      showLoading: false,
      data: {
        income: 0,
        expense: 0,
        docs: []
      }
    };

    this._updateDates = this._updateDates.bind(this);
    this._getDataForDates = this._getDataForDates.bind(this);
    this._showSpinner = this._showSpinner.bind(this);
    this._deleteTransaction = this._deleteTransaction.bind(this);
  }

  componentDidMount() {
    this._getDataForDates();
  }

  _updateDates(stDate = this.state.startDate, edDate = this.state.endDate) {
    let { startDate, endDate } = this.state;

    startDate = stDate;
    endDate = edDate;

    this.setState({ startDate, endDate }, () => this._getDataForDates());
  }

  async _deleteTransaction(id) {
    const API_URL = config.get('app.apiURL');

    try {
      this._showSpinner(true);

      const response = await axios.delete(`${API_URL}/transaction/${id}`);
      const { status } = response.data;

      if (status === 'success') {

        this._getDataForDates();
      }
      this._showSpinner();
    } catch(e) {
      throw e;
    }
  }

  async _getDataForDates() {

    const { startDate, endDate } = this.state;
    const END_DATE_FORMATED = moment(endDate).format('YYYY-MM-DD');
    const START_DATE_FORMATED = moment(startDate).format('YYYY-MM-DD');
    const API_URL = config.get('app.apiURL');
    const API_ROUTE = `${API_URL}/transaction/get/from/${START_DATE_FORMATED}/to/${END_DATE_FORMATED}`;

    try {
      this._showSpinner(true);
      let { data } = this.state;
      const response = await axios.get(API_ROUTE);
      const { status, data: responseData } = response.data;

      if (status === 'success') {
        data = responseData;
        this.setState({ data });
      }

      this._showSpinner(false);
    } catch(e) {
      throw e;
    }
  }

  _showSpinner( visible = false ) {
    this.setState({ showLoading: visible });
  }

  render() {
    const { startDate, endDate, showLoading, data } = this.state;

    return(
      <div>
        <h1 className="title is-1 has-text-centered">Acklexpenses</h1>
        <br/>
        <div className="columns is-centered">
          <div className="column is-three-fifths box is-clearfix">
            <Summary startDate={startDate} endDate={endDate} updateDates={this._updateDates} income={data.income} expense={data.expense}/>
            <Actions/>
            {showLoading && <Spinner/>}
            <DataTable key={data.docs.length} data={data.docs} deleteTransaction={this._deleteTransaction} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
