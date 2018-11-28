import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../components/List/List';

class HistoryPage extends Component {
  render() {
    return (
      <List {...this.props} />
    );
  }
}

export default HistoryPage;