import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: props.startDate,
      endDate: props.endDate,
      focusedInput: null
    };

    this._updateDates = this._updateDates.bind(this);
  }


  shouldComponentUpdate() {
    return true;
  }

  _updateDates(stDate = null, edDate = null) {
    let { startDate, endDate } = this.state;

    startDate = stDate === null ? startDate : stDate;
    endDate = edDate === null ? startDate : edDate;

    this.setState({ startDate, endDate }, () => this.props.updateDates(startDate, endDate));

  }

  render() {
    return(
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Date</p>
            <DateRangePicker
              startDate={this.state.startDate}
              required={true}
              startDateId="your_unique_start_date_id"
              endDate={this.state.endDate}
              endDateId="your_unique_end_date_id"
              onDatesChange={({ startDate, endDate }) => this._updateDates(startDate, endDate)}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              showDefaultInputIcon={true}
              small={true}
              noBorder={true}
              readOnly={true}
              withPortal={true}
              minimumNights={0}
              regular={true}
              isOutsideRange={ function noRefCheck() {} }
            />
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
  }

}

export default Summary;
