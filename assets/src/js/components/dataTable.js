import React from 'react';

const dataTable = (props) => {
  return(
    <div className="box table-container">
      <table className="table is-fullwidth is-striped">
  <thead>
    <tr>
      <th><abbr title="#">#</abbr></th>
      <th>Description</th>
      <th>Amount</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th><abbr title="#">#</abbr></th>
      <th>Description</th>
      <th>Amount</th>
      <th>Actions</th>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <th>1</th>
      <td>Cafe con vaque hay no</td>
      <td>100</td>
      <td>
          <button className="button">Eliminar</button>
      </td>
    </tr>
    <tr>
      <th>2</th>
      <td><a href="https://en.wikipedia.org/wiki/Newcastle_United_F.C." title="Newcastle United F.C.">Newcastle United</a> <strong>(R)</strong>
      </td>
      <td>38</td>
      <td>9</td>
    </tr>
    <tr>
      <th>3</th>
      <td><a href="https://en.wikipedia.org/wiki/Newcastle_United_F.C." title="Newcastle United F.C.">Newcastle United</a> <strong>(R)</strong>
      </td>
      <td>38</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
    </div>
  );
};

export default dataTable;
