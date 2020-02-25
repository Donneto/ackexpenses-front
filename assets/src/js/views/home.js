// Dependencies
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import config from 'react-global-configuration';


// Custom
import Summary from '../components/transaction/summary';
import DataTable from '../components/transaction/dataTable';
import Spinner from '../components/spinner';
import TransactionForm from '../components/transaction/transactionForm';
import AppNavigator from '../components/transaction/navigator';

// Internals
const internals = {
  API_URL: config.get('app.apiURL')
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment(),
      showLoading: false,
      categories: [],
      data: {
        income: 0,
        expense: 0,
        docs: []
      },
      editMode: false
    };

    this._updateDates = this._updateDates.bind(this);
    this._getDataForDates = this._getDataForDates.bind(this);
    this._showSpinner = this._showSpinner.bind(this);
    this._deleteTransaction = this._deleteTransaction.bind(this);
    this._getCategories = this._getCategories.bind(this);
  }

  componentDidMount() {
    this._getDataForDates();
    this._getCategories();
  }

  _updateDates(stDate = this.state.startDate, edDate = this.state.endDate) {
    let { startDate, endDate } = this.state;

    startDate = stDate;
    endDate = edDate;

    this.setState({ startDate, endDate }, () => this._getDataForDates() );
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

  async _getCategories() {
    let response;

    let { categories } = this.state;

    const API_ROUTE = `${internals.API_URL}/category`;

    try {
      response = await axios.get(API_ROUTE);
      const { status, data } = response.data;

      if (status === 'success') {
        categories = data;
        this.setState({ categories });
      }

    } catch(e) {
      throw e;
    }
  }

  async _getDataForDates() {
    let { data } = this.state;
    const { startDate, endDate } = this.state;
    const END_DATE_FORMATED = moment(endDate).format('YYYY-MM-DD');
    const START_DATE_FORMATED = moment(startDate).format('YYYY-MM-DD');

    const API_ROUTE = `${internals.API_URL}/transaction/get/from/${START_DATE_FORMATED}/to/${END_DATE_FORMATED}`;

    let response;

    try {
      this._showSpinner(true);
      response = await axios.get(API_ROUTE);
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
    const { startDate, endDate, showLoading, data, categories, editMode } = this.state;

    return(
      <div>
        <h1 className="title is-1 has-text-centered">Acklexpenses</h1>
        <br/>
        <div className="columns is-centered">
          <div className="column is-three-fifths box is-clearfix">
            <Summary startDate={startDate} endDate={endDate} updateDates={this._updateDates} income={data.income} expense={data.expense}/>
            {showLoading && <Spinner/>}
            <AppNavigator />
            <DataTable key={data.docs.length} data={data.docs} deleteTransaction={this._deleteTransaction}  />
          </div>
          <div className="column is-one-quarter">
            {!editMode && <TransactionForm categories={ categories } refreshData={this._getDataForDates} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
