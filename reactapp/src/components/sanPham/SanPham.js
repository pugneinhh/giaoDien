import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Tag,
  Row,
  Col,
  Slider
} from 'antd';
import { Link } from "react-router-dom";
import { InfoCircleFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { PlusCircleFilled } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { MdSearch } from 'react-icons/md';
import axios from 'axios';
export default function SanPham() {
  //Form
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [form] = Form.useForm();
  //Tìm kiếm 
  const onChangeFilter = (changedValues, allValues) => {
    timKiemSanPham(allValues);
  }
  const timKiemSanPham = (dataSearch) => {
    axios.post('http://localhost:8080/san-pham/tim-kiem', dataSearch)
      .then(response => {
        // Update the list of items
        setSanPhams(response.data);
      })
      .catch(error => console.error('Error adding item:', error));
  }
  //Table
  const [sanPham, setSanPhams] = useState([]);

  useEffect(() => {
    loadSanPham();
  }, []);

  const loadSanPham = async () => {
    const result = await axios.get("http://localhost:8080/san-pham", {
      validateStatus: () => {
        return true;
      }
    });
    setSanPhams(result.data);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "idSP",
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
      title: "Số Lượng",
      dataIndex: "soLuong",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag
              color="#f50
                "
            >
              Dừng Bán
            </Tag>
          ) : (
            <Tag
              color="#87d068
                "
            >
              Còn Bán
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "idSP",

      render: (title) => (
        <Space size="middle">
          <a>
            <Button href={`/showct/${title}`} type="primary" primary shape="circle" icon={<InfoCircleFilled size={20} />} />
          </a>
          {/* <a>
            <Button href='/upanh' type="primary" danger shape="circle" icon={<DeleteFilled size={20} />} />
          </a> */}
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className="container-fluid">
        <div style={{
          marginTop: '50px',
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px', padding: '10px'
        }}>
          <h4 className="ms-3 mt-2 mb-2"><FilterFilled /> Bộ lọc</h4>
          <Form className="row"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onChangeFilter}
            onClick={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1400,

            }}

            form={form}
          >
            <div className="col-md-4">
              <Form.Item label="Tên & Mã" name='tenSP'>
                <Input />
              </Form.Item>
            </div>
            <div className='col-md-4'>
              <Form.Item label="Trạng Thái" name='trangThaiSP'>
                <Select defaultValue={null}>
                  <Select.Option value={null}>Tất cả</Select.Option>
                  <Select.Option value='1'>Còn Bán</Select.Option>
                  <Select.Option value='0'>Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Số lượng" name='soLuongSP'>
                 <Slider style={{width: '250px'}} min={2} max={1000}/>             
              </Form.Item>
            </div>
          </Form>
        </div>
        <div style={{
          marginTop: '50px',
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px', padding: '10px'
        }}>
          <h4 className="ms-3 mt-2 mb-2"><BookFilled /> Danh sách sản phẩm</h4>
          <div className="ms-3">
            <a name="" id="" class="btn btn-success mt-2" href="/them-san-pham" role="button"> <PlusCircleFilled />  Thêm sản phẩm</a>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={sanPham} columns={columns} pagination={{ showQuickJumper: true, defaultPageSize: 3, defaultCurrent: 1, total:100}} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}