// Dependencies
import React from 'react';
import moment from 'moment';

// custom
import { _formatMoney } from '../../utils';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, deleteTransaction } = this.props;
    const tbody = data.length ? (<tbody>
      {data.map( (item, i) => {
        const FORMATED_DATE = moment.utc(item.date).format('MMM DD, YYYY');
        const incomeLabel = item.type === 'income' ? 'tag is-success' : 'tag is-danger';

        return (<tr key={item._id}>
          <th><small><b>{i + 1}</b></small></th>
          <td><small><b>{FORMATED_DATE}</b></small></td>
          <td><small><b>{item.description}</b></small></td>
          <td><span className="tag is-warning is-capitalized"><small><b>{item.type}</b></small></span></td>
          <td><span className="tag is-light is-info"><b>{item.category}</b></span></td>
          <td><span className={incomeLabel}><small><b>{_formatMoney(item.amount)}</b></small></span></td>
          <td>
            <button className="button is-small is-danger is-outlined" onClick={ () => deleteTransaction(item._id) }><span className="icon is-large"><i className="mdi mdi-delete-forever mdi-18px"/></span> </button>
          </td>
        </tr>);
      })}
    </tbody>) : ( <tbody><tr><td colSpan="7"><p className="has-text-centered"><span className="tag"><b> <span className="icon"><i className="mdi mdi-emoticon-sad"/></span> Nothing to see here!... Add a transaction to begin!</b></span></p></td></tr></tbody> );

    return(
      <div className="box table-container">
        <table className="table is-fullwidth is-striped">
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
            <tr><td colSpan="7"><p><small><b>Note:</b> The API i hosted on a free tier of Heroku. Heroku Dynos (on this tier) go to sleep after a time without inactivity. <b>Please, give it a few seconds for the dyno to start.</b></small></p></td></tr>
            <tr>
              <td colSpan="7"><br/><h3 className="title is-5 has-text-centered"> <span className="icon"><i className="mdi mdi-table"/></span> </h3></td>
            </tr>
          </tfoot>
          {tbody}
        </table>
      </div>
    );
  }
}

export default DataTable;
