// Dependencies
import React from 'react';
import moment from 'moment';


// custom
import { _formatMoney } from '../utils';


class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this._showData = this._showData.bind(this);
  }

  _showData() {
    const { data, deleteTransaction } = this.props;

    return data.length ? <table className="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th><abbr title="#">#</abbr></th>
          <th>Date</th>
          <th>Description</th>
          <th>Type</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td colSpan="7"><br/><h3 className="has-text-centered">Acklexpenses</h3></td>
        </tr>
      </tfoot>
      <tbody>
        {data.map( (item, i) => {
          const FORMATED_DATE = moment.utc(item.date).format('MMM DD, YYYY');
          const incomeLabel = item.type === 'income' ? 'tag is-success' : 'tag is-danger';

          return (<tr key={item._id}>
            <th>{i + 1}</th>
            <td><small><b>{FORMATED_DATE}</b></small></td>
            <td><small><b>{item.description}</b></small></td>
            <td><span className="tag is-dark is-capitalized"><small><b>{item.type}</b></small></span></td>
            <td><span className="tag is-light is-info"><b>{item.category}</b></span></td>
            <td><span className={incomeLabel}><small><b>{_formatMoney(item.amount)}</b></small></span></td>
            <td>
              <button className="button is-small is-danger is-outlined" onClick={ () => deleteTransaction(item._id) }><span className="icon is-large"><i className="mdi mdi-delete-forever mdi-18px"/></span> </button>
              <button className="button is-small is-info is-outlined"><span className="icon is-large"><i className="mdi mdi-pencil mdi-18px"/></span></button>
            </td>
          </tr>);
        })}
      </tbody>
    </table> : <h1 className="has-text-centered">No data to show</h1>;
  }

  render() {
    return(
      <div className="box table-container">
        {this._showData()}
      </div>
    );
  }
}

export default DataTable;
