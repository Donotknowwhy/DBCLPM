import React from 'react'
import Nav from '../../components/Navigation'
import Main from '../../components'
import {Layout, Input, Skeleton, Tabs, InputNumber, Form, Button } from 'antd'
import styles from './index.module.scss'

const {Content} = Layout;
const { TabPane } = Tabs;

const layout = {
    labelCol: {
      span: 1,
    },
    wrapperCol: {
      span: 23,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 28,
    },
  };

function index() {

    function callback(key) {
        console.log(key);
      }


      const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


    return (
        <div>
            <Main>
            <Content className={styles.siteLayout} style={{ padding: '0 50px', marginTop: 64 }}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Tab 1" key="1">

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >
                        <Form.Item
                            label="Năm"
                            name="year"
                            rules={[
                            {
                                required: true,
                                message: 'Hãy điền đầy đủ trường này!',
                            },
                            ]}
                        >
                            <InputNumber min={1900} max={2100} defaultValue={1999} />
                        </Form.Item>

                        <Form.Item
                            label="%"
                            name="percent"
                            rules={[
                            {
                                required: true,
                                message: 'Hãy điền đầy đủ trường này!',
                            },
                            ]}
                        >
                            <InputNumber
                        defaultValue={10}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                    />
                        </Form.Item>

                        

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                        </Form>

                </TabPane>
                <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
                </TabPane>
            </Tabs>
            </Content>
            
            </Main>
            
        </div>
    )
}

export default index
