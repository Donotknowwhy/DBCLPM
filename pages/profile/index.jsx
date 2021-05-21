import React, { useState, useEffect } from "react";
import Nav from "../../components/Navigation";
import Main from "../../components";
import {
  Layout,
  Input,
  Skeleton,
  Tabs,
  InputNumber,
  Form,
  Button,
  Modal,
  notification,
} from "antd";
import axios from "axios";
import styles from "./index.module.scss";

const { Content } = Layout;
const { TabPane } = Tabs;
const { confirm } = Modal;

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

const openNotification = () => {
  notification.success({
    message: "Các thay đổi đã được lưu thành công",
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

function index() {
  function callback(key) {
    console.log(key);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  useEffect(() => {
    axios
      .get("https://sqa-10-backend.herokuapp.com/api/v1/annual/")
      .then((res) => {
        console.log(res.data);
        setValue1(res.data.year);
        setValue2(res.data.adjustment);
      });
  }, []);

  useEffect(() => {
    setValue1(value1);
    setValue2(value2);
  }, [value1 || value2]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    console.log(value2 + " " + value1);
    axios
      .post(
        `https://sqa-10-backend.herokuapp.com/api/v1/annual/?adjustment=${value2}&year=${value1}`
      )
      .then((res) => {
        openNotification();
      });
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const showPromiseConfirm = () => {
    confirm({
      title: "Thay đổi các định mức?",
      content: "Bạn có chắc chắn muốn lưu lại sự thay đổi này không?",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        handleOk();
      },
      onCancel() {
        handleCancel();
      },
    });
  };

  function onChange1(value) {
    console.log("changed", value);
    setValue1(value);
  }

  function onChange2(value) {
    console.log("changed", value);
    setValue2(value);
  }

  return (
    <div>
      <Main>
        <Content
          className={styles.siteLayout}
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Mức thay đổi hàng năm" key="1">
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="Năm" name="year">
                  <InputNumber
                    min={1900}
                    max={3000}
                    defaultValue={value1}
                    onChange={onChange1}
                    value={value1}
                  />
                  <p className="no-display">{value1}</p>
                </Form.Item>

                <Form.Item label="%" name="percent">
                  <InputNumber
                    min={0}
                    max={100}
                    defaultValue={value2}
                    onChange={onChange2}
                    value={value2}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                  <p className="no-display">{value1}</p>
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={value1 && value2 ? false : true}
                  onClick={showPromiseConfirm}
                >
                  Gửi đi
                </Button>
              </Form>
            </TabPane>
            <TabPane tab="Mức lương thấp nhất khi tham gia" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </Content>
      </Main>
    </div>
  );
}

export default index;
