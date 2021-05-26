import React from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Popover, Button, Dropdown } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { signOut, user } from "../api/firebase-client";
import { useUser } from "../utils/use-user";
import Avatar from "antd/lib/avatar/avatar";

const { Header, Content, Footer } = Layout;

function index(props) {
  const { user, logout } = useUser();

  const content = (
    <Menu>
      <Menu.Item key="0">
        <a id="#index" href="/">Trang chủ</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a id="#list" href="/list">Xem danh sách</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a id="report" href="/report">Xuất báo cáo</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a id="profile" href="/profile">Cấu hình</a>
      </Menu.Item>
    </Menu>
  );

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a  href="#">Trang cá nhân</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">Cài đặt</a>
      </Menu.Item>
      <Menu.Item key="3">
      <Button onClick={() => logout()}>Đăng xuất</Button>
      </Menu.Item>
    </Menu>
  );




  return (
    <div>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className={styles.logo} />
          <Row>
            <Col xs={0} sm={0} md={24}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
                <Menu.Item key="4">
                  <a id="index" href="/">Trang chủ</a>
                </Menu.Item>
                <Menu.Item key="1">
                  <a id="list" href="/list">Xem danh sách</a>
                </Menu.Item>
                <Menu.Item key="2">
                  <a id="report" href="/report">Xuất báo cáo</a>
                </Menu.Item>
                <Menu.Item key="3">
                  <a id="profile" href="/profile">Cấu hình</a>
                </Menu.Item>
                
                <Dropdown overlay={menu} placement="bottomCenter">
                  <Avatar size={36} src={user ? user.photoURL : ""} />
                  </Dropdown>
                
              </Menu>
            </Col>

            <Col xs={24} sm={24} md={0}>
              <Popover content={content} trigger="click">
                <Button icon={<UnorderedListOutlined />}></Button>
              </Popover>
            </Col>
          </Row>
        </Header>
        <Layout>{props.children}</Layout>
      </Layout>
    </div>
  );
}

export default index;
