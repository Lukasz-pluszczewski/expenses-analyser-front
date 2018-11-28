import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { Table } from 'antd';

export default class TransactionsList extends Component {
  static propTypes = {};

  mapTransactionsForTable = transactions => {
    return _.map(transactions, (transaction, index) => ({
      key: index,
      transactionDate: transaction.transactionDate,
      categories: transaction.categories,
      amountConverted: transaction.amountConverted,
      description: transaction.description,
      receiver: transaction.receiver,
      cardTransaction: transaction.cardTransaction,
    }));
  };

  renderTable = () => {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'transactionDate',
        key: 'transactionDate',
      },
      {
        title: 'Categories',
        dataIndex: 'categories',
        key: 'category',
      },
      {
        title: 'Amount',
        dataIndex: 'amountConverted',
        key: 'amountConverted',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Receiver',
        dataIndex: 'receiver',
        key: 'receiver',
      },
      {
        title: 'Card',
        dataIndex: 'cardTransaction',
        key: 'cardTransaction',
      },
    ];

    // accountCurrency: "PLN"
    // additionalData: []
    // amount: -109.97
    // amountConverted: -109.97
    // bookingDate: "07-11-2018"
    // cardTransaction: true
    // currency: "PLN"
    // description: "Megasklep Sportowy DEC Krakow PL"
    // details: "↵<div>Transakcja kart&#x105; debetow&#x105;</div>↵<div>Opis transakcji <span>: Megasklep Sportowy DEC Krakow PL</span>↵</div>↵"
    // transactionDate: "07-11-2018"

    let dataSource = this.props.loading || !this.props.data ? [] : this.mapTransactionsForTable(this.props.data);

    return <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ defaultPageSize: 10 }}
      loading={this.props.loading}
    />;
  };

  render() {
    return this.renderTable();
  }
}
