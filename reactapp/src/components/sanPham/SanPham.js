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
} from 'antd';
import { Link } from "react-router-dom";
import { InfoCircleFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { PlusCircleFilled } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import {MdSearch} from 'react-icons/md';
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
    if (result.status === 302) {
      setSanPhams(result.data);
    }
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
      sorter: (a, b) => a.ma - b.ma,
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
      dataIndex:"idSP",

      render: (title) => (
              <Space size="middle">
          <a>
            <Link to={`/showct/${title}`} className='btn btn-primary'><InfoCircleFilled/></Link>
          </a>
          <a>
            <Button type="primary" danger shape="circle" icon={<DeleteFilled size={20} />} />
          </a>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className="container-fluid">
        <div className='bg-light pb-2 pt-2 mt-2' style={{ borderRadius: 20 }}>
          <h4 className="ms-3 mt-2 mb-2"><FilterFilled /> Bộ lọc</h4>
          <Form className="row"
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
            size={componentSize}
            style={{
              maxWidth: 1600,
            }}
          >
            <div className="col-md-5">
              <Form.Item label="Tên & Mã">
                <Input />
              </Form.Item>
            </div>
            <div className='col-md-5'>
              <Form.Item label="Trạng Thái">
                <Select value={selectedValue} onChange={handleChange}>
                  <Select.Option value="1">Còn Bán</Select.Option>
                  <Select.Option value="0">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className='ms-3'>
              <Button type='primary' size='large'><MdSearch/>  Tìm Kiếm</Button>
            </Form.Item>
          </Form>
        </div>
        <div className='bg-light pb-2 pt-2 mt-2' style={{ borderRadius: 20 }}>
          <h4 className="ms-3 mt-2 mb-2"><BookFilled /> Danh sách sản phẩm</h4>
          <div className="ms-3">
            <a name="" id="" class="btn btn-success mt-2" href="/them-san-pham" role="button"> <PlusCircleFilled />  Thêm sản phẩm</a>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={sanPham} columns={columns} pagination='5' />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}