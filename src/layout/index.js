import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import '../css/Layout.css';
import { Link } from 'umi';
import constant from '../utils/constant';
import BreadContext from '../components/BreadContext/index';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadName: '',
    };
  }

  // 递归生成menu的item
  renderMenu = data =>
    data.map(element => {
      if (element.children) {
        return (
          <SubMenu key={element.code} title={element.name}>
            {this.renderMenu(element.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={element.code} icon={<EditOutlined />}>
            <Link to={element.href} />
            {element.name}
          </Menu.Item>
        );
      }
    });

  // 菜单点击事件
  handleClick = e => {
    const { key, keyPath } = e;
    console.log('handleClick', keyPath);

    let breadNameDOM = this.createBreadcrumb(keyPath);
    this.updateBreadName(breadNameDOM);
  };

  // 格式化menu数据为Map<code,name>的形式
  formatMenuToMap = (menuData, map) =>
    menuData.map(element => {
      map.set(element.code, element.name);

      if (element.children) {
        this.formatMenuToMap(element.children, map);
      }
    });

  // 更新state.breadName
  updateBreadName = value => {
    this.setState({
      breadName: value,
    });
  };

  // 创建面包屑组件，并返回
  createBreadcrumb = keyPath => {
    let newMenuMap = new Map();
    this.formatMenuToMap(constant.menu, newMenuMap);

    console.log('newMenuMap', newMenuMap);

    // 翻转keyPath，以便遍历得到面包屑Item数组
    let reverseKeyPath = keyPath.reverse();
    let breadItemArr = [];
    reverseKeyPath.forEach(item => {
      breadItemArr.push(
        <Breadcrumb.Item key={item}>{newMenuMap.get(item)}</Breadcrumb.Item>,
      );
    });
    console.log('breadItemArr', breadItemArr);

    return (
      <Breadcrumb separator="->" style={{ margin: '16px 0' }}>
        {breadItemArr}
      </Breadcrumb>
    );
  };

  render() {
    return (
      <Layout>
        <Header className="header">
          <h1>五星电器|合作方协同平台</h1>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.handleClick}
            >
              {this.renderMenu(constant.menu)}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <BreadContext.Provider value={this.state.breadName}>
                {this.props.children}
              </BreadContext.Provider>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default PageLayout;
