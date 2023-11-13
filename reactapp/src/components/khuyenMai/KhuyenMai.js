import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Tag , Form , Input , Select , InputNumber , Button , DatePicker} from "antd";
import "./KhuyenMai.scss";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const onChange = (value) => {
  console.log('changed', value);
};

const defaultExpandable = {
expandedRowRender: (record) => <p>{record.description}</p>,
};



export default function KhuyenMai() {

  const [selectedValue, setSelectedValue] = useState('Tiền mặt');
  const handleChange = (value) => {
      console.log(`Selected value: ${value}`);
      setSelectedValue(value);
    };
  
  
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [khuyenMai, setKhuyenMais] = useState([]);
  useEffect(() => {
    loadKhuyenMai();
  }, []);
  const loadKhuyenMai = async () => {
    const result = await axios.get("http://localhost:8080/khuyen-mai", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setKhuyenMais(result.data);
    }
  };
  const columns = [
    {
      title: "#",
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

      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],

      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Loại",
      dataIndex: "loai",

      filters: [
        {
          text: "Tiền Mặt",
          value: "Tiền Mặt",
        },
        {
          text: "Phần Trăm",
          value: "Phầm Trăm",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Khuyến mại tối đa",
      dataIndex: "khuyen_mai_toi_da",
      key: "khuyen_mai_toi_da",
      render: (khuyen_mai_toi_da, x) => (
        <>
          {x.loai === "Tiền Mặt" || x.loai === "Tiền mặt"
            ? (console.log("Loại" + x.loai),
              new Intl.NumberFormat("vi-Vi", {
                style: "currency",
                currency: "VND",
              }).format(khuyen_mai_toi_da))
            : (console.log("Loại" + x.loai), khuyen_mai_toi_da + "%")}
        </>
      ),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngay_bat_dau",
      render: (ngay_bat_dau) => (
        <>{moment(ngay_bat_dau).format("DD/MM/YYYY, hh:mm:ss")}</>
      ),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Ngày kết thúc ",
      dataIndex: "ngay_ket_thuc",
      render: (ngay_ket_thuc) => (
        <>{moment(ngay_ket_thuc).format("DD/MM/YYYY, hh:mm:ss")}</>
      ),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
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
            <Tag color="#ff0000">Đã hết hạn</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",

      render: () => (
        <Space size="middle">
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <div>
        <div className="container-fluid">
          <h4 className="text-center pt-1">Danh sách khuyến mại</h4>

          <div className="bg-light m-2 p-3 pt-5" style={{ borderRadius: 20 }}>
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
              size={componentSize}
              style={{
                maxWidth: 1600,
              }}
            >
              <div className="col-md-4">
                <Form.Item label="Mã KM">
                  <Input placeholder="Mã khuyến mại"/>
                </Form.Item>
                <Form.Item label="Phương thức">
                  <Select value={selectedValue} onChange={handleChange}>
                    <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
                    <Select.Option value="Phần trăm">Phần trăm</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
              <Form.Item label="Tên KM" >
              <Input placeholder = "Tên khuyến mại "/>
                </Form.Item>
                <Form.Item label="Giảm Tối Đa" >
                  {selectedValue === "Tiền mặt" ? (
                    <InputNumber
                      defaultValue={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      onChange={onChange}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={onChange}
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>

              </div>
              <div className="col-md-4">
                <Form.Item label="Ngày bắt đầu">
                  <DatePicker style={{ width: "100%" }} placeholder="Ngày bắt đầu"/>
                </Form.Item>
                <Form.Item label="Ngày kết thúc">
                  <DatePicker style={{ width: "100%" }} placeholder="Ngày kết thúc"/>
                </Form.Item>
              </div>
              <div className="text-center">
              <Form.Item className="text-center">
                <Button type="primary">Thêm</Button>
              </Form.Item>
              </div>
            </Form>
          </div>

          <div className="text-center">
            <a name="" id="" class="btn btn-primary" href="#" role="button">
              Thêm khuyến mại
            </a>
          </div>

          <div className="container-fluid mt-4">
            <div>
              <Table dataSource={khuyenMai} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
