import React, { useState, useEffect } from "react";
import Nav from "../../components/Navigation";
import Main from "../../components";
import { Layout, Select, Typography, Row, Col, Skeleton } from "antd";
import styles from "./index.module.scss";
import Head from 'next/head'
const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

function index() {
  return (
    <div>
    <Head>
        <title>Xuất báo cáo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Main>
        <Content
          className={styles.siteLayout}
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Title>Tính năng này sẽ sớm được phát triển trong tương lai <br/> Xin lỗi bạn vì sự bất tiện này!!!</Title>
        </Content>
      </Main>
    </div>
  );
}

export default index;
