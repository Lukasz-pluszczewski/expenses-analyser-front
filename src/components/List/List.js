import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TransactionsList from '../TransactionsList/TransactionsList';

export default class List extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.any,
  };

  render() {
    return (
      <div>
        {this.props.data && !this.props.error ? <TransactionsList data={this.props.data.all} loading={this.props.loading} /> : null}
      </div>
    );
  }
}
