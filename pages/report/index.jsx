import React, {useState, useEffect} from 'react'
import Nav from '../../components/Navigation'
import Main from '../../components'
import {Layout, Select, Typography, Row, Col, Skeleton} from 'antd'
import styles from './index.module.scss'

const {Content} = Layout;
const { Option } = Select;
const {Title} = Typography;

function index() {

  

    

    return (
        <div>
            <Main>
            <Content className={styles.siteLayout} style={{ padding: '0 50px', marginTop: 64 }}>
              sss
         </Content>
            </Main>
        </div>
    )
}

export default index
