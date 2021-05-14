import React,{useEffect, useState} from 'react'
import Nav from '../../components/Navigation'
import Main from '../../components'
import {Layout, Input, Space,Select, Skeleton, Checkbox, Button, Row, Col, Typography} from 'antd'
import styles from './index.module.scss'
import { AudioOutlined, SearchOutlined  } from '@ant-design/icons';
import axios from "axios";

const {Content} = Layout;
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

function index() {

    const [data,setData] = useState([])
    const [data2,setData2] = useState('')
    const [load, setLoad] = useState(true)
    const [valueCheckBox, setValueCheckBox] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [city,setCity] = useState([])

    const [cityChoose, setCityChoose] = useState('')
    const [districtChoose, setDistrictChoose] = useState('')
    const [wardChoose, setWardChoose] = useState('')
    


    useEffect(() =>{
      axios.get('https://sqa-10-backend.herokuapp.com/api/v1/address/province').then((res) =>{
        console.log(res.data)
        setCity(res.data)
        })
    },[])

    function onChange(value) {
        console.log(value)
        if(value){
          axios.get(`https://sqa-10-backend.herokuapp.com/api/v1/address/district?province=${value}`)
        .then(res => {
          console.log(res.data)
          setDistrict(res.data)
          setLoad(true)
          setCityChoose(value)
        })
        }
        else {
          setData('')
          setDistrict('')
          setLoad(true)
        }
      }

      function onChangeQ(value) {
        console.log(value)
         if(value){
          axios.get(`https://sqa-10-backend.herokuapp.com/api/v1/address/ward?district=${value}`)
          .then(res => {
            console.log(res.data)
            setWard(res.data)
            setLoad(true)
            setDistrictChoose(value)
          })    
         }  
      }

      function onChangeH(value){
        console.log(value)
        if(value){
          setWardChoose(value)
        }
      }

    const searchData = () =>{
      console.log(cityChoose)
      console.log(districtChoose)
      console.log(wardChoose)
      axios.get(`https://sqa-10-backend.herokuapp.com/api/v1/employee/full?province=${cityChoose}&district=${districtChoose}&ward=${wardChoose}`)
      .then(res => {
        console.log(res.data)
        setData(res.data)
        setLoad(false)
      })
    }
    
    function onBlur() {
      console.log('blur');
    }
    
    function onFocus() {
      console.log('focus');
    }
    
    function onSearch(val) {
      
    }

    return (
        <div>
            <Main>
            <Content className={styles.siteLayout} style={{ padding: '0 50px', marginTop: 64 }}>
            <Space direction="vertical">
                    <br/>
                    <Text>Tìm kiếm theo: </Text>
                      <Select
                        showSearch
                        style={{ width: 200, marginTop: '10px', width:'350px'}}
                        placeholder="Chọn thành phố"
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                    {
                      city && city.map((items) =>(
                        <div key={items.province_name}>
                        {items.province_name}
                        <Option value={items.province_name}>{items.province_name}</Option>
                        </div>
                      )
                      )
                    }
                    </Select>
                        
                    <Select
                        showSearch
                        style={{ width: 200, marginTop: '10px', width:'350px'}}
                        placeholder="Chọn quận"
                        optionFilterProp="children"
                        onChange={onChangeQ}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                          district && district.map((items) =>
                            (
                              <div key={items.district_name}>
                                {items.district_name}
                                <Option value={items.district_name}>{items.district_name}</Option>
                              </div>
                            )
                          )
                        }
                        
                    </Select>
                    <Select
                        showSearch
                        style={{ width: 200, marginTop: '10px', width:'350px'}}
                        placeholder="Chọn phường"
                        optionFilterProp="children"
                        onChange={onChangeH}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                          ward && ward.map((items) =>
                            (
                              <div key={items.ward_name}>
                                {items.ward_name}
                                <Option value={items.ward_name}>{items.ward_name}</Option>
                              </div>
                            )
                          )
                        }
                    </Select>
                      
                        <Button style={{marginTop:'10px'}} type="primary" icon={<SearchOutlined />} onClick={searchData}>
                          Tìm
                        </Button>
                      
                <br/>
                <table className={styles.table}>
        <tr className={styles.tr}>
          <th className={styles.th} >Name</th>
          <th className={styles.th} >BirthDay</th>
          <th className={styles.th} >Join date</th>
          <th className={styles.th} >Position</th>
          <th className={styles.th} >Address</th>
          <th className={styles.th} >Salary</th>
        </tr>
        {
          data && data.map((item) => {

            const ngaySinh = new Date(item.birthday)
              const ngay = ngaySinh.getDate() + '-' + ngaySinh.getMonth() + '-' + ngaySinh.getFullYear()
              console.log(ngay)
            return (
              <tr
                key={item.id}
              >
                <th className={styles.th} >{item ? item.name: 'No data'}</th>
                <th className={styles.th} >{item ? item.phone: 'No data'}</th>
                <th className={styles.th} >aa</th>
                <th className={styles.th} >{item ? item.position: 'No data'}</th>
                <th className={styles.th} >{item ? item.address: 'No data'}</th>
                <th className={styles.th} >{item ? item.salary: 'No data'}</th>
                
              </tr>
            )
          }
          )
        }
        {
          load == true && <Skeleton active />
        }
      </table>
                </Space>
            </Content>
            </Main>
        </div>
    )
}

export default index
