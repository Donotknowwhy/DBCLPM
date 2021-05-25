import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Skeleton,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ModalUpdate.module.scss";

const { confirm } = Modal;

const openNotification = () => {
  notification.success({
    message: "Các thay đổi đã được lưu thành công",
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

function ModalUpdate() {
  function callback(key) {
    console.log(key);
  }

  const [visible, setVisible] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [salary, setSalary] = useState("");
  const [salaryNew, setSalaryNew] = useState('')


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
      .get("https://sqa-10-backend.herokuapp.com/api/v1/minsalary/")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoad(false);
      });
  }, []);

  // useEffect(() =>{
  //   axios
  //     .get("https://sqa-10-backend.herokuapp.com/api/v1/minsalary/")
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //       setLoad(false);
  //     });
  // },[salary])

  const handleCancel = () => {
    setVisible(false);
    setIsModalVisible(false);
  };

  const updateSalary = (id, area, type, salaryNew) => {
    axios
      .put("https://sqa-10-backend.herokuapp.com/api/v1/minsalary/", {
        id,
        area,
        type,
        salary : salaryNew,
      })
      .then(() => {
        console.log(salary);
        console.log("update salary success");
      })
      .catch((error) => console.log(error));
  };

  const modalUpdate = (id, area, type, salary) => {
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
        updateSalary(id, area, type, salaryNew);
      },
      onCancel() {
        handleCancel();
      },
    });
  };

  function onChangeSalary(value) {
    console.log(value);
    setSalary(value);
  }

  function onChange1(value) {
    console.log("changed", value);
    setValue1(value);
  }

  function onChange2(value) {
    console.log("changed", value);
    setValue2(value);
  }

  

  const validateMessages = {
    required: "Không được bỏ trống trường này",
  };

  return (
    <table className={styles.table}>
      <tr className={styles.tr}>
        <th className={styles.th}>ID</th>
        <th className={styles.th}>Vùng</th>
        <th className={styles.th}>Loại</th>
        <th className={styles.th}>Tiền lương</th>
        <th className={styles.th}>Tác vụ</th>
      </tr>
      {data.length !== 0 &&
        data.map((item) => {
          return (
            <tr key={item.id}>
              <th className={styles.th}>{item.id}</th>
              <th className={styles.th}>{item.area.split(" ")[1]}</th>
              <th className={styles.th}>{item.type}</th>
              <th className={styles.th}>{item.salary}</th>
              <th className={styles.th}>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={ async() => {
                    // console.log(item.salary);
                    // setId(item.id);
                    // setArea(item.area);
                    // setType(item.type);
                    // setSalary(item.salary);
                    console.log(item.salary);
                    setSalaryNew(item.salary)
                    console.log(salaryNew)
                    modalUpdate(item.id, item.area, item.type, item.salary );
                  }}
                >
                  Chỉnh sửa
                </Button>
              </th>
            </tr>
          );
        })}
      {load == true && <Skeleton active />}
    </table>
  );
}

export default ModalUpdate;
