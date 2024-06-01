import React, { useState } from 'react';
import {
  InboxOutlined,
  TeamOutlined,
  FileTextOutlined,
  CommentOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeRouteFromMenu } from '../../shared/changeRouteFromMenu';
import styles from './Dashboard.module.css'
import useLogout from '../../shared/useLogout';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Task Board', '1', <TeamOutlined />),
  getItem('Store Info Table', '2', <InboxOutlined />),
  getItem('Products Table', '3', <InboxOutlined />),
  getItem('News Table', '4', <FileTextOutlined />),
  getItem('Testimonials Table', '5', <CommentOutlined />),
  getItem('FAQ Table', '6', <CommentOutlined />)
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const changeMenu = (event: any) => {
    navigate(changeRouteFromMenu(event.key))
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        className={styles.sider} 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* <div className="demo-logo-vertical" /> */}
        <div className={styles.siderMenu}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={changeMenu} />
          <Button ghost type="primary" icon={<LogoutOutlined rotate={180}/>} size={'large'} onClick={logout} style={{margin: '4px', width: 'auto'}}></Button>
        </div>
      </Sider>
      <Layout className={styles.innerLayout}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '0 16px', display: 'flex', justifyContent: 'center', alignItems:'center', width:'100%'}}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;