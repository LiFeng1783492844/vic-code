import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import '../css/Layout.css';
import { Link } from 'umi';
import constant from '../utils/constant';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const PageLayout = props => {
  function handleClick(e) {
    console.log(e);
  }

  const renderMenu = data =>
    data.map(element => {
      if (element.children) {
        return (
          <SubMenu key={element.code} title={element.name}>
            {renderMenu(element.children)}
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
          >
            {renderMenu(constant.menu)}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb separator="->" style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>京东商品管理</Breadcrumb.Item>
            <Breadcrumb.Item>品牌确认</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
