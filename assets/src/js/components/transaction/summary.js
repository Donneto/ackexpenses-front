// Dependencies
import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

// custom
import { _formatMoney } from '../../utils';

const internals = {
  shouldUpdate: false,
  startDate: moment(),
  endDate: moment()
};

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: internals.startDate,
      endDate: internals.endDate,
      focusedInput: null,
    };

    this._updateDates = this._updateDates.bind(this);
    this._drpClose = this._drpClose.bind(this);
  }

  _updateDates(stDate = null, edDate = null) {
    const { startDate, endDate } = this.state;
    const dateStart = (stDate === null) ? startDate : stDate;
    const dateEnd = (edDate === null) ? endDate : edDate;

    if (moment(startDate).format('MM-DD-YYYY') !== moment(dateStart).format('MM-DD-YYYY') || moment(endDate).format('MM-DD-YYYY') !== moment(dateEnd).format('MM-DD-YYYY')) {
      internals.shouldUpdate = true;
    }

    this.setState({ startDate: dateStart, endDate: dateEnd });
  }

  _drpClose() {

    if (internals.shouldUpdate) {
      this.props.updateDates(this.state.startDate, this.state.endDate);
      internals.shouldUpdate = false;
    }
  }

  render() {
    const {income, expense} = this.props;

    return(
      <div className="box">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Choose Date</p>
              <DateRangePicker
                startDate={this.state.startDate}
                required={true}
                startDateId="StartDateMain"
                endDate={this.state.endDate}
                endDateId="EndDateMain"
                onDatesChange={ ({ startDate, endDate }) => this._updateDates(startDate, endDate) }
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                showDefaultInputIcon={true}
                small={true}
                noBorder={true}
                readOnly={true}
                withPortal={true}
                minimumNights={0}
                onClose= { () => this._drpClose() }
                isOutsideRange={ function noRefCheck() {} }
              />
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Income</p>
              <p className="title is-5">{_formatMoney(income)}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Expenses</p>
              <p className="title is-5">{_formatMoney(expense)}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Balance</p>
              <p className="title is-5">{_formatMoney(income - expense)}</p>
            </div>
          </div>
        </nav>
      </div>
    );
  }

}

export default Summary;
