import React, { Component } from 'react';
import moment from 'moment';

import request from '../../services/request';

import HomePage from '../../pages/HomePage';
import ListPage from '../../pages/ListPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DatePicker, Menu, Icon } from 'antd';

import './App.scss';

const { MonthPicker } = DatePicker;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
  state = {
    loading: true,
    data: {},
    error: null,
  };

  componentDidMount() {
    this.makeRequest('11-2018');
  }

  makeRequest = date => {
    this.setState({ loading: true });
    request.makeRequest('GET', '/stats', `month=${date}`)
      .then(results => {
        this.setState({
          data: results,
          loading: false,
        })
      }).catch(error => {
      this.setState({
        error,
        loading: false,
      });
    });
  }

  onDateChange = (date, formattedDate) => {
    console.log('date', {date, formattedDate});
    this.makeRequest(formattedDate);
  };

  render() {
    const routeProps = {
      loading: this.state.loading,
      data: this.state.data,
      error: this.state.error,
    };

    return (
      <Router>
      <div className="App">
          <div className="App__menu">
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="home">
                <Link to="/"><Icon type="pie-chart" />Stats</Link>
              </Menu.Item>
              <Menu.Item key="list">
                <Link to="list"><Icon type="ordered-list" />List</Link>
              </Menu.Item>
              {/*<SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
                <MenuItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
              <Menu.Item key="alipay" disabled>
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
              </Menu.Item>*/}
            </Menu>
          </div>
          <div className="App__monthPickerContainer">
            <MonthPicker defaultValue={moment('11-2018', 'MM-YYYY')} format="MM-YYYY" onChange={this.onDateChange} />
          </div>
          <div className="App__content">
            <Switch>
              <Route
                exact
                path="/"
                render={props => <HomePage {...props} {...routeProps} />}
              />
              <Route
                exact
                path="/list"
                render={props => <ListPage {...props} {...routeProps} />}
              />
            </Switch>
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
