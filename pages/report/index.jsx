import React, {useState, useEffect} from 'react'
import Nav from '../../components/Navigation'
import Main from '../../components'
import {Layout, Select, Typography, Row, Col, Skeleton} from 'antd'
import styles from './index.module.scss'

const {Content} = Layout;
const { Option } = Select;
const {Title} = Typography;

function index() {

  const [load, setLoad] = useState(false)

    function onChange(value) {
        console.log(`selected ${value}`);
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }

    return (
        <div>
            <Main>
            <Content className={styles.siteLayout} style={{ padding: '0 50px', marginTop: 64 }}>
            <Row style={{marginTop: '20px'}}>
                <Col>
                <Title level={5}>Xuất báo cáo theo: </Title>
                </Col>
                <Col>
                    <Select
                        showSearch
                        style={{ width: 200, marginLeft:'10px'}}
                        placeholder="Chọn thời gian"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Theo tháng">Theo tháng</Option>
                        <Option value="Theo quý">Theo quý</Option>
                        <Option value="Theo năm">Theo năm</Option>
                    </Select>
                </Col>
            </Row>  
            <br/>
                <table className={styles.table}>
        <tr className={styles.tr}>
          <th className={styles.th} >Id Customer</th>
          <th className={styles.th} >Card Number</th>
          <th className={styles.th} >Full Name</th>
          <th className={styles.th} >Date of Bird</th>
          <th className={styles.th} >Email</th>
          <th className={styles.th} >Action</th>
        </tr>
        {/* {
          data.map((item) => {
            const ngaySinh = new Date(item.person.ngaySinh);
            const dateOfBird = ngaySinh.getDate() + ' tháng ' +
              ngaySinh.getMonth() + ', ' + ngaySinh.getFullYear()
            return (
              <tr
                key={item.id}
              >
                <th className={styles.th} >{item.idCustomer}</th>
                <th className={styles.th} >{item.person.cardNumber}</th>
                <th className={styles.th} >{item.person.fullName.ho + " " +
                  item.person.fullName.tenDem + " " +
                  item.person.fullName.ten}</th>
                <th className={styles.th} > {dateOfBird} </th>
                <th className={styles.th} >{item.person.email}</th>
                <th className={styles.th}>
                  <Space>
                    <TableCustomer
                      item={item}
                      toggleUpdate={toggleUpdate}
                    />
                    <Button type="primary" onClick={() => {
                      showPromiseConfirm(item.id)
                    }}>Xóa</Button>
                  </Space>
                </th>
              </tr>
            )
          }
          )
        } */}
        {
          load == false && <Skeleton active />
        }
      </table>          
         </Content>
            </Main>
        </div>
    )
}

export default index
