import { useState } from "react";
import { Menu, Select, Row, Col, Popover, Button, Avatar } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./Navigation.module.scss";
import { useUser } from "../utils/use-user";
import { user } from "../api/firebase-client";
const { SubMenu } = Menu;

export default function Navigation() {
  const { user } = useUser();

  const [current, setCurrent] = useState("");
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={24}>
          <Menu
            selectedKeys={[current]}
            mode="horizontal"
            className={styles.menu}
          >
            <Menu.Item key="mail4">
              <a href="/">Trang chủ</a>
            </Menu.Item>
            <Menu.Item key="mail">
              <a href="/list">Xem danh sách</a>
            </Menu.Item>
            <Menu.Item key="mail1">
              <a href="/report">Xuất báo cáo</a>
            </Menu.Item>
            <Menu.Item key="mail2">
              <a href="/profile">Cấu hình</a>
            </Menu.Item>
          </Menu>
          <Avatar size="large" src={user ? user.photoURL : ""} />
          <Button>Đăng xuất</Button>
        </Col>

        <Col xs={24} sm={24} md={0}>
          <Popover content={content} trigger="click"></Popover>
        </Col>
      </Row>
    </>
  );
}
