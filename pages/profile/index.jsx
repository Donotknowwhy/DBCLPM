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
  Row,
  Col,
  notification,
} from "antd";

import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./index.module.scss";
import ModalUpdate from "../../components/profileComponents/ModalUpdate";
import Head from 'next/head'
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [salary, setSalary] = useState("");
  const [id, setId] = useState("");
  const [area, setArea] = useState("");
  const [type, setType] = useState("");

  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [data, setData] = useState("");
  const [load, setLoad] = useState(true);


  useEffect(() => {
    axios
      .get("https://sqa-10-backend.herokuapp.com/api/v1/annual/")
      .then((res) => {
        console.log(res.data);
        setValue1(res.data.year);
        setValue2(res.data.adjustment);
      });
  }, []);



  const showModal = () => {
    setIsModalVisible(true);
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    console.log(value2 + " " + value1);
    axios
      .post(`https://sqa-10-backend.herokuapp.com/api/v1/annual/`, {
        year: value1,
        adjustment: value2,
      })
      .then((res) => {
        openNotification();
      });
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
    setIsModalVisible(false);
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

  const updateSalary = (id,area,type,salary) => {
    axios
      .put("https://sqa-10-backend.herokuapp.com/api/v1/minsalary/", {
        id,
        area,
        type,
        salary,
      })
      .then(() => {
        console.log(salary)
        console.log("update salary success");
      })
      .catch((error) => console.log(error));
  };

  const modalUpdate = () => {
    confirm({
      title: "Thay đổi số tiền lương",
      content: (
        <div>
          <Input style={{ marginLeft: "10px" }} disabled value={id} />
          <br />
          <br />
          <Input
            style={{ marginLeft: "10px" }}
            disabled
            value={area.split(" ")[1]}
          />
          <br />
          <br />
          <Input style={{ marginLeft: "10px" }} disabled value={type} />
          <br />

          <br />

          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            validateMessages={validateMessages}
          >
            <InputNumber
              style={{ marginLeft: "10px", width: "100%" }}
              min={0}
              max={999999999}
              value={salary}
              placeholder="Tiền lương"
              onChange={onChangeSalary}
            />
          </Form.Item>
        </div>
      ),
      okText: "Đồng ý",
      cancelText: "Hủy",

      onOk() {
        updateSalary(id,type,area,salary);
      },
      onCancel() {
        handleCancel();
      },
    });
    // updateSalary();
    // setIsModalVisible(false);
  };

  function onChange1(value) {
    console.log("changed", value);
    setValue1(value);
  }

  function onChange2(value) {
    console.log("changed", value);
    setValue2(value);
  }

  function onChangeSalary(value) {
    console.log(value)
    setSalary(value);
  }

  const validateMessages = {
    required: "Không được bỏ trống trường này",
  };

  return (
    <div>
    <Head>
        <title>Cấu hình</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Main>
        <Content
          className={styles.siteLayout}
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Mức thay đổi hàng năm" key="1">
              <ModalUpdate />
            </TabPane>
            <TabPane tab="Mức lương thấp nhất khi tham gia" key="2">
              <p>(*): Giá trị hiện tại đã thiết lập</p>
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="Năm*" name="year">
                  <InputNumber
                    min={1900}
                    max={3000}
                    defaultValue={value1}
                    onChange={onChange1}
                    value={value1}
                  />
                  <p className="no-display">{value1}</p>
                </Form.Item>

                <Form.Item label="%*" name="percent">
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
          </Tabs>
        </Content>
      </Main>
    </div>
  );
}

export default index;
