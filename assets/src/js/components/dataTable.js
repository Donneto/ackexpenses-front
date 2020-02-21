import React from 'react';

const dataTable = () => {
  return(
    <div className="box table-container">
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th><abbr title="#">#</abbr></th>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><abbr title="#">#</abbr></th>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <th>1</th>
            <td>20/12/2019</td>
            <td>Cafe con vaque hay no</td>
            <td>Expense</td>
            <td><span className="tag is-danger"><b>100.00</b></span></td>
            <td>
              <button className="button is-small is-danger is-outlined"><span className="icon is-large"><i className="mdi mdi-delete-forever mdi-24px"></i></span> </button>
               <button className="button is-small is-info is-outlined"><span className="icon is-large"><i className="mdi mdi-pencil mdi-24px"></i></span> </button>
            </td>
          </tr>
          <tr>
            <th>1</th>
            <td>20/12/2019</td>
            <td>Cafe con vaque hay no</td>
            <td>Expense</td>
            <td><span className="tag is-danger"><b>75.00</b></span></td>
            <td>
              <button className="button is-small is-danger is-outlined"><span className="icon is-large"><i className="mdi mdi-delete-forever mdi-24px"></i></span> </button>
               <button className="button is-small is-info is-outlined"><span className="icon is-large"><i className="mdi mdi-pencil mdi-24px"></i></span> </button>
            </td>
          </tr>
          <tr>
            <th>1</th>
            <td>20/12/2019</td>
            <td>Cafe con vaque hay no</td>
            <td>Income</td>
            <td><span className="tag is-success"><b>1500.00</b></span></td>
            <td>
              <button className="button is-small is-danger is-outlined"><span className="icon is-large"><i className="mdi mdi-delete-forever mdi-24px"></i></span> </button>
               <button className="button is-small is-info is-outlined"><span className="icon is-large"><i className="mdi mdi-pencil mdi-24px"></i></span> </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default dataTable;
