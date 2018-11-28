import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stats from '../components/Stats/Stats';

class HistoryPage extends Component {
  render() {
    return (
      <Stats {...this.props} />
    );
  }
}

export default HistoryPage;