import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TransactionsList from '../TransactionsList/TransactionsList';
import { Table, DatePicker } from 'antd';
import { Doughnut } from 'react-chartjs-2';


export default class Stats extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.any,
  };

  mapCategoriesForTable = (categories = []) => {
    return _.map(categories, (value, category) => ({
      value: value.toFixed(2),
      category,
      key: category,
    }));
  };

  mapCategoriesForChart = categories => {
    const data = {
      datasets: [{
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#86ff78',
          '#df53eb',
          '#51fffc',
          '#3937ff',
          '#df53eb',
          '#b32525',
          '#525252',
          '#21759d',
          '#eb845d',
          '#aceb4b',
        ],
      }],
      labels: []
    };

    if (!categories) {
      return data;
    }

    _.forEach(categories, (value, category) => {
      data.datasets[0].data.push(value);
      data.labels.push(category.toLowerCase());
    });

    return data;
  };

  renderTable = () => {
    const columns = [
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
      }
    ];

    let dataSource = this.props.loading ? [] : this.mapCategoriesForTable(this.props.data.categories);

    return <Table
      key="table"
      dataSource={dataSource}
      columns={columns}
      pagination={{ defaultPageSize: 50 }}
      loading={this.props.loading}
      expandedRowRender={record => <TransactionsList data={this.props.data.categorised[record.category]} />}
    />;
  };

  renderChart = () => {
    if (this.props.loading) {
      return '';
    }

    return <Doughnut key="pie-chart" data={this.mapCategoriesForChart(this.props.data.categories)} />
  };

  renderContent = () => {
    if (this.props.error) {
      return <pre>{JSON.stringify(this.props.error, null, 2)}</pre>
    }
    return <React.Fragment>
      {[this.renderTable(), this.renderChart()]}
    </React.Fragment>;
    // return <pre>{JSON.stringify(this.props.data.categories, null, 2)}</pre>
  };

  render() {
    return (
      <div className="Stats__container">
        {this.renderContent()}
      </div>
    );
  }
}
