import React, { useState, useEffect , Text , View} from "react";
import axios from "axios";
import { Space, Table, Tag , Form , Input , Select , InputNumber , Button , DatePicker , Divider} from "antd";
import "./KhuyenMai.scss";
import { EyeOutlined , PlusCircleOutlined , StopOutlined,UnorderedListOutlined , FilterFilled , SearchOutlined} from "@ant-design/icons";
import { LuBadgePercent } from 'react-icons/lu';
import moment from "moment";
import {Link} from "react-router-dom";
import ThemKhuyenMai from "./ThemKhuyenMai";
import SuaKhuyenMai from "./SuaKhuyenMai";
import { IoInformation} from 'react-icons/io5';


const KhuyenMai = () => {

const onChange = (value) => {
  console.log('changed', value);
};

const defaultExpandable = {
expandedRowRender: (record) => <p>{record.description}</p>,
};


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }
  const [selectedValue, setSelectedValue] = useState('Tất cả');
  const [stateTimKiem, setStateTimKiem] = useState();

  const [form] = Form.useForm();
  
  
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [promotions, setPromotions] = useState([]);

  const [khuyenMai, setKhuyenMais] = useState([]);

  useEffect(() => {
    loadKhuyenMai();

  }, []);

  useEffect(() => {
    const fetchData = async() => {
    const response = await axios.get("http://localhost:8080/khuyen-mai");
    setKhuyenMais(response.data);
    }
    fetchData();
  },[khuyenMai])

  const [suaKhuyenMai,setSuaKhuyenMai]=useState({});



  const resetSuaKhuyenMai=()=>{
    // setID('');
    setSuaKhuyenMai({});
  }

//Tìm kiếm
function handleFilter(value, key) { 
  const newListFilter = khuyenMai.filter((item) =>  item[key] === value)
  setStateTimKiem(newListFilter)
  
}






  const loadKhuyenMai = async () => {
    const result = await axios.get("http://localhost:8080/khuyen-mai").then((response) => {
    setKhuyenMais(response.data);
    setPromotions(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  };
  
  const columns = [
    {
      title: "#",
      selector: (row) => promotions.indexOf(row) +1,
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      center: "true",

      sorter: (a, b) => a.ma.slice(2) - b.ma.slice(2),
    },
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Loại",
      dataIndex: "loai",
      key : "loai",
      filters: [
        {
          text: "Tiền Mặt",
          value: "Tiền Mặt",
        },
        {
          text: "Phần Trăm",
          value: "Phần Trăm",
        },
      ],
      onFilter: (value, record) => record.loai.indexOf(value) === 0,
    },
    {
      title: "Khuyến mại tối đa",
      dataIndex: "khuyen_mai_toi_da",
      key: "khuyen_mai_toi_da",
      render: (khuyen_mai_toi_da, x) => (
        <>
          {x.loai === "Tiền Mặt" || x.loai === "Tiền mặt"
            ? 
              (new Intl.NumberFormat("vi-Vi", {
                style: "currency",
                currency: "VND",
              }).format(khuyen_mai_toi_da))
            : (khuyen_mai_toi_da + "%")}
        </>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngay_bat_dau",
      render: (ngay_bat_dau) => (
        <>{moment(ngay_bat_dau).format("DD/MM/YYYY, hh:mm:ss")}</>
      ),

    },
    {
      title: "Ngày kết thúc ",
      dataIndex: "ngay_ket_thuc",
      render: (ngay_ket_thuc) => (
        <>{moment(ngay_ket_thuc).format("DD/MM/YYYY, hh:mm:ss")}</>
      ),

    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag
              color="#f50
                "
            >
              Sắp bắt đầu
            </Tag>
          ) : trang_thai === 1 ? (
            <Tag
              color="#87d068
                "
            >
              Đang diễn ra
            </Tag>
          ) : (
            <Tag color="#ff0000">Đã kết thúc</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "Sắp bắt đầu",
          value: "0",
        },
        {
          text: "Đang diễn ra",
          value: "1",
        },
        {
          text: "Đã kết thúc",
          value :"2",
        },
      ],
      onFilter: (value, record) => record.trang_thai === parseInt(value) ,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <Link to={{pathname :`/sua-khuyen-mai/${record.id}` }}className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill">
              <EyeOutlined/>
              </Link>
            
          </a>

          <a className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill" disabled>
          <StopOutlined />       
          </a>
        </Space>
      ),
      center:'true',

    },
  ];
  return (
    <div className="container">
      <div>
        <div className="container-fluid">
          
          <Divider orientation="left" color="none"><h4 className="text-first pt-1 fw-bold"><LuBadgePercent/> Quản lý khuyến mại</h4></Divider>

          <div className="bg-light m-2 p-3" style={{ borderRadius: 20 }}>

          <div className="text-first fw-bold" >
            <FilterFilled/> Bộ lọc
          </div>
              <hr/>
            <Form
              className=" row col-md-12"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onFormLayoutChange}
              // onChange={timKiem}
              form = {form}
              size={componentSize}
              style={{
                maxWidth: 1600,
              }}
            >
              <div className="col-md-4">
                <Form.Item label="Mã KM" name='ma_khuyen_mai'>
                  <Input placeholder="Mã khuyến mại" className="rounded-pill border-warning"/>
                </Form.Item>
                <Form.Item label="Loại" name='loai'>
                  <select value ={selectedValue} onChange= {handleChange} className="rounded-pill border-warning" id="abc">
                    <option value="Tất cả">Tất cả</option>
                    <option value="Tiền mặt" >Tiền mặt</option>
                    <option value="Phần trăm" >Phần trăm</option>
                  </select>
                </Form.Item>
              </div>
              <div className="col-md-4">

              <Form.Item label="Tên KM" name='ten'>
              <Input placeholder = "Tên khuyến mại " className="rounded-pill border-warning"/>
                </Form.Item>
                <Form.Item label="Giảm Tối Đa" name='giam_toi_da'>
                  {selectedValue === "Tiền mặt" ? (
                    <InputNumber
                      defaultValue={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      onChange={onChange}
                      style={{ width: "100%" }}
                      className="rounded-pill border-warning"
                    />
                  ) : selectedValue === "Phần trăm"  ?(
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={onChange}
                      style={{ width: "100%" }}
                      className="rounded-pill border-warning"
                    />
                  ) : <Input className="rounded-pill border-warning" disabled></Input>}
                </Form.Item>

              </div>
              <div className="col-md-4" >
                <Form.Item label="Ngày bắt đầu" name='ngay_bat_dau'>
                  <DatePicker style={{ width: "100%" }} placeholder="Ngày bắt đầu" className="rounded-pill border-warning"/>
                </Form.Item>
                <Form.Item label="Ngày kết thúc" name='ngay_ket_thuc'>
                  <DatePicker style={{ width: "100%" }} placeholder="Ngày kết thúc" className="rounded-pill border-warning"/>
                </Form.Item>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-1"></div>
              <div className="col-md-4" >
              <Form.Item className="text-center">
              {/* <Button className="btn btn-warning nut-tim-kiem">Tìm kiếm</Button> */}
              <button className="btn btn-warning nut-tim-kiem rounded-pill fw-bold" ><SearchOutlined />Tìm kiếm</button>
              </Form.Item>
              </div>

            </Form>
          </div>

          <div className="text-end">
            {/* <a name="" id="" class="btn btn-warning bg-gradient fw-bold nut-them" role="button">                
            </a> */}
            <br/>
            
              <Link to='/frm-khuyen-mai' className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill"> 
              <PlusCircleOutlined/> Thêm khuyến mại 
              </Link>
          </div>
          <div className="text-first fw-bold">
            <p><UnorderedListOutlined /> Danh sách khuyến mại</p>
          </div>
           <hr/>
          <div className="container-fluid mt-4" >
            <div>
              <Table dataSource={khuyenMai} columns={columns} id="bang" pagination={{defaultPageSize:5}}/>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
export default  KhuyenMai;
