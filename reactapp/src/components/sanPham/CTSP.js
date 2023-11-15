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
import { InfoCircleFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { PlusCircleFilled } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import {MdSearch} from 'react-icons/md';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function CTSP() {
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
  const [cTSP, setCTSPs] = useState([]);

  useEffect(() => {
    loadCTSP();
  }, []);
  const { uuid } = useParams();
    console.log('UUID:', uuid);
  const loadCTSP = async () => {
    const result = await axios.get(`http://localhost:8080/ctsp/showct/${uuid}`, {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setCTSPs(result.data);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSP",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }, 
    {
      title: "Kích Thước",
      dataIndex: "tenKT",
    },
    {
      title: "Màu Sắc",
      dataIndex: "tenMS",
    },
    {
      title: "Chất Liệu",
      dataIndex: "tenCL",
    },
    {
      title: "Độ Cao",
      dataIndex: "tenDC",
    },
    {
      title: "Danh Mục",
      dataIndex: "tenDM",
    },
    {
      title: "Hãng",
      dataIndex: "tenH",
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
    },
    {
      title: "Giá Bán",
      dataIndex: "giaBan",
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

      render: () => (
        <Space size="middle">
          <a>
            <Button type="primary" primary shape="circle" icon={<InfoCircleFilled size={20} />} />
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
                <Input className="rounded-pill border" />
              </Form.Item>
            </div>
            <div className='col-md-5'>
              <Form.Item label="Trạng Thái">
                <Select className="rounded-pill border" value={selectedValue} onChange={handleChange}>
                  <Select.Option value="1">Còn Bán</Select.Option>
                  <Select.Option value="0">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className='container-fluid'>
            <Form.Item className='text-center'>
              <Button type='primary' size='large' className="rounded-pill border-primary"><MdSearch/>  Tìm Kiếm</Button>
            </Form.Item>
            </div>
          </Form>
        </div>
        <div className='bg-light pb-2 pt-2 mt-2' style={{ borderRadius: 20 }}>
          <h4 className="ms-3 mt-2 mb-2"><BookFilled /> Danh sách Chi Tiết Sản Phẩm</h4>
          <div className="ms-3">
            <a name="" id="" class="btn btn-success mt-2 rounded-pill border-success" href="#" role="button"> <PlusCircleFilled />  Thêm Chi Tiết Sản Phẩm</a>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={cTSP} columns={columns} pagination='5' />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}