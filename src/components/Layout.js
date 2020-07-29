import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import BrandRecognition from './BrandRecognition';
import '../css/Layout.css';

export default props => {
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;

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
            <SubMenu key="sub1" title="京东商品管理">
              <Menu.Item key="1" icon={<EditOutlined />}>
                品牌确认
              </Menu.Item>
            </SubMenu>
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
            <BrandRecognition />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
