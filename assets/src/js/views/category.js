// Dependencies
import React from 'react';
import axios from 'axios';
import config from 'react-global-configuration';
import { Link } from 'react-router-dom';

// custom
import CategoryItem from '../components/category/categoryItem';
import Spinner from '../components/spinner';

const internals = {
  API_URL: config.get('app.apiURL'),
  API_ROUTE: `${config.get('app.apiURL')}/category`
};

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      categories: [],
      errorMsg: null,
      showLoading: false
    };

    this._getCategories = this._getCategories.bind(this);
    this._deleteCategory = this._deleteCategory.bind(this);
    this._addCategory = this._addCategory.bind(this);
    this._handleInputUpdate = this._handleInputUpdate.bind(this);
    this._showSpinner = this._showSpinner.bind(this);
  }

  componentDidMount() {
    this._getCategories();
  }

  async _deleteCategory(id) {
    let response;

    this._showSpinner(true);
    try {
      response = await axios.delete(`${internals.API_ROUTE}/${id}`);
      const { status } = response.data;

      if (status === 'success') {
        this._getCategories();
      }
      this._showSpinner();
    } catch(e) {
      throw e;
    }
  }

  async _getCategories() {
    let { categories } = this.state;

    let response;

    this._showSpinner(true);
    try {
      response = await axios.get(internals.API_ROUTE);
      const { status, data } = response.data;

      if (status === 'success') {
        categories = data;
        this.setState({ categories });
      }

      this._showSpinner(false);
    } catch(e) {
      throw e;
    }
  }

  async _addCategory() {
    let { category } = this.state;

    let response;

    this.setState({ errorMsg: null});

    try {
      category = category.trim();

      if (!category.length) {
        this.setState({ errorMsg: 'Provide a Category'});

        return;
      }

      this._showSpinner(true);
      response = await axios.post(internals.API_ROUTE, { name: category });
      const { status } = response.data;

      if (status === 'success') {

        this._getCategories();
      }

      this._showSpinner();
    } catch(e) {
      throw e;
    }
  }

  _handleInputUpdate(e) {
    this.setState( { [e.target.name]: e.target.value });
  }

  _showSpinner( showLoading = false ) {
    this.setState({ showLoading });
  }

  render() {
    const { categories, errorMsg, showLoading } = this.state;
    const catLength = categories.length;
    const noCatMessage = catLength ? '' : <p className="has-text-centered"><span className="tag"><b> <span className="icon"><i className="mdi mdi-emoticon-sad"/></span> Nothing to see here!... Add a Category to begin!</b></span></p>;
    const hasCatClass = catLength ? 'box buttons has-text-centered' : 'box has-text-centered';

    return(
      <div>
        <h1 className="title is-1 has-text-centered">Acklexpenses</h1>
        <br/>
        <div className="columns is-centered">
          <div className="column is-three-fifths box is-clearfix">
            <h2 className="title is-4 is-clearfix">
              <Link to="/" className="button is-info is-small is-outlined is-rounded">
                <span className="icon is-medium"><i className="mdi mdi-arrow-left-circle mdi-18px"/></span>
              </Link> / Categories
            </h2>
            <hr/>
            <div className="box">
              <div className="tags is-block">
                {errorMsg && <div className="tag is-danger is-block has-text-centered"><b>{errorMsg}</b></div>}
              </div>
              <div className="columns is-centered">
                <div className="column is-three-quarters">
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small is-success is-rounded" name="category" onChange={(e) => this._handleInputUpdate(e)} type="text" placeholder="Category" />
                    <span className="icon is-small is-left">
                      <i className="mdi mdi-file-cabinet"/>
                    </span>
                  </div>
                </div>
                <div className="column">
                  <button onClick={ () => this._addCategory()} className="button is-success is-small is-fullwidth is-rounded"><b>Add Category</b></button>
                </div>
              </div>
            </div>
            {showLoading && <Spinner/>}
            <div className={hasCatClass}>
              {categories.map(item => <CategoryItem key={item._id} item={item} delete={this._deleteCategory} />)}
              {noCatMessage}
            </div>
            <h3 className="title is-5 has-text-centered"> <span className="icon"><i className="mdi mdi-table"/></span> </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
