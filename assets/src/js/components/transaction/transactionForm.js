// Dependencies
import React from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import Select from 'react-select';
import axios from 'axios';
import config from 'react-global-configuration';

// internals
const internals = {
  typeOptions: [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ],
  API_URL: config.get('app.apiURL')
};

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      focused: false,
      selectedTypeOption: internals.typeOptions[0],
      selectedCategoryOption: null,
      categories: props.categories,
      description: '',
      amount: 0,
      errors: []
    };

    this._handleSelectChange = this._handleSelectChange.bind(this);
    this._handleCategoryChange = this._handleCategoryChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleInputUpdate = this._handleInputUpdate.bind(this);
  }

  _handleSelectChange(selectedTypeOption) {
    this.setState({ selectedTypeOption });
  }

  _handleCategoryChange(selectedCategoryOption) {
    this.setState({ selectedCategoryOption });
  }

  _handleInputUpdate(e) {
    this.setState( { [e.target.name]: e.target.value });
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const { date, selectedTypeOption, selectedCategoryOption, description, amount } = this.state;
    const errors = [];
    const API_ROUTE = `${internals.API_URL}/transaction`;

    let response;

    // Clear Errors
    this.setState({ errors });

    // Validations
    if (amount === 0) { errors.push('Amount cannot be 0'); }
    if (!description.trim().length) { errors.push('Provide a Description'); }
    if (selectedCategoryOption === null) { errors.push('Select a Category'); }
    if (errors.length) {
      this.setState({ errors });

      return;
    }

    const transaction = {
      amount,
      description,
      date: moment(date).format('YYYY-MM-DD'),
      category: selectedCategoryOption.value,
      type: selectedTypeOption.value
    };

    try {
      response = await axios.post(API_ROUTE, transaction);
      const { status } = response.data;

      if (status === 'success') {
        this.props.refreshData();
      }

    } catch(error) {
      throw error;
    }
  }

  render() {
    const { selectedTypeOption, selectedCategoryOption, errors } = this.state;
    const { categories } = this.props;

    return(
      <div className="box">
        <div className="tags is-block">
          {errors.map( item => <div className="tag is-danger is-small"><b>{item}</b></div>)}
        </div>
        <h1 className="title is-5"> <span className="icon"><i className="mdi mdi-plus-box" /></span> Add Transaction</h1>
        <hr/>
        <form onSubmit={ this._handleSubmit }>
          <div className="field">
            <SingleDatePicker
              date={this.state.date}
              onDateChange={date => this.setState({ date })}
              focused={this.state.focused}
              onFocusChange={({ focused }) => this.setState({ focused })}
              id="transac_date"
              readOnly={true}
              small={true}
              block={true}
              withPortal={true}
              numberOfMonths={1}
              isOutsideRange={ function noRefCheck() {} }
            />
          </div>
          <div className="field">
            <label className="label">Amount</label>
            <p className="control is-expanded has-icons-left">
              <input className="input is-small" type="number" name="amount" placeholder="Amount" defaultValue="0" min="0" onChange={ (e) => this._handleInputUpdate(e) } />
              <span className="icon is-small is-left"><i className="mdi mdi-cash-usd"/></span>
            </p>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <p className="control is-expanded has-icons-left">
              <input className="input is-small" type="text" name="description" placeholder="Description" required onChange={ (e) => this._handleInputUpdate(e) } />
              <span className="icon is-small is-left"><i className="mdi mdi-card-text-outline"/></span>
            </p>
          </div>
          <div className="field">
            <label className="label">Type</label>
            <Select
              value={selectedTypeOption}
              onChange={ (option) => this._handleSelectChange(option)}
              options={internals.typeOptions}
              className="bulma-picker"
            />
          </div>
          <div className="field">
            <label className="label">Category</label>
            <Select
              value={selectedCategoryOption}
              onChange={ (option) => this._handleCategoryChange(option)}
              options={categories.map( item => ({ value: item.name, label: item.name}) )}
              className="bulma-picker"
            />
          </div>
          <hr/>
          <button className="button is-primary is-outlined is-small is-rounded"><span className="icon"><i className="mdi mdi-plus-box mdi-18px"/></span> <span><b>Add Transaction</b></span></button>
        </form>
      </div>
    );
  }
}

export default TransactionForm;
