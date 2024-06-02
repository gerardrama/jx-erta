import React, { useState } from 'react';
import {
  TeamOutlined,
  LogoutOutlined,
  BarChartOutlined,
  FundProjectionScreenOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeRouteFromMenu } from '../../shared/changeRouteFromMenu';
import styles from './Dashboard.module.css'
import useLogout from '../../shared/useLogout';
import { Header } from 'antd/es/layout/layout';
import Notifications from '../../components/Notifications';
import logo from '../../img/logo.png'

const { Content, Sider } = Layout;

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
  getItem('Dashboard', '1', <BarChartOutlined />),
  getItem('Projects', '2', <FundProjectionScreenOutlined />),
  getItem('Departments', '3', <TeamOutlined /> ),
  getItem('Employees', '4', <UserOutlined />),
  // getItem('News Table', '4', <FileTextOutlined />),
  // getItem('Testimonials Table', '5', <CommentOutlined />),
  // getItem('FAQ Table', '6', <CommentOutlined />)
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
        <img src={logo} alt="" style={{
              width: "150px",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
              margin: "20px 0",
        }}/>
        <div className={styles.siderMenu}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={changeMenu} />
          <Button ghost type="primary" icon={<LogoutOutlined rotate={180}/>} size={'large'} onClick={logout} style={{margin: '4px', width: 'auto'}}></Button>
        </div>
      </Sider>
      <Layout className={styles.innerLayout}>
        <Header className={styles.header} style={{ background: colorBgContainer, zIndex: 99 }}>
          <h1 className={styles.title}>
            {/* Admin Dashboard */}
          </h1>
          <div style={{marginRight: '20px'}}>
            <Notifications />
          </div>
        </Header>
        <Content style={{ 
          margin: '0 16px'
        // , display: 'flex', justifyContent: 'center', alignItems:'center', width:'100%'
        }}>
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