import React from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Popover, Button } from 'antd';
import {UnorderedListOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import {signOut} from '../api/firebase-client'
import {useUser} from '../utils/use-user' 

const { Header, Content, Footer } = Layout;

function index(props) {

  const {logout} = useUser();



    const content = (
        <Menu>
          <Menu.Item key="0">
            <a href="/">Trang chủ</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="/list">Xem danh sách</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/report">Xuất báo cáo</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/profile">Cấu hình</a>
          </Menu.Item>
        </Menu>
      );

      const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="/profile">Trang cá nhân</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="#">Cài đặt</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a onClick={() => logout()}>Đăng xuất</a>
          </Menu.Item>
        </Menu>
      );  

    return (
        <div>
            <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className={styles.logo} />
            <Row>
                
           <Col xs={0} sm={0} md={24}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                    <Menu.Item key="4">
                    <a href="/">
                        Trang chủ
                    </a>
                    </Menu.Item>
                <Menu.Item key="1">
                    <a href="/list" >
                        Xem danh sách
                    </a></Menu.Item>
                <Menu.Item key="2">
                    <a href="/report" >
                        Xuất báo cáo
                    </a>
                </Menu.Item>
                <Menu.Item key="3">
                    <a href="/profile">
                        Cấu hình
                    </a>
                </Menu.Item>
                <Button onClick={() => logout()}>Đăng xuất</Button>
            </Menu>
            
            </Col>

            <Col xs={24} sm={24} md={0}>
            <Popover content={content} trigger="click" >
            <Button icon={<UnorderedListOutlined/>}></Button>
          </Popover>
            </Col>
            </Row>
    </Header>
    <Layout>
      {props.children}
    </Layout>
  </Layout>
        </div>
    )
}



export default index
