import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Tag , Form , Input , Select , InputNumber , Button , DatePicker} from "antd";
import { EyeOutlined , PlusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import {Link} from "react-router-dom";
import { MdMargin } from "react-icons/md";
const onChange = (value) => {
    console.log('changed', value);
  };
  
  const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
  };

export default function ThemKhuyenMai(){
    const [selectedValue, setSelectedValue] = useState('Tiền mặt');
    const handleChange = (value) => {
        console.log(`Selected value: ${value}`);
        setSelectedValue(value);
      };
    
    
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

    // const loadSanPham = async () => {
    //     const result = await axios.get("http://localhost:8080/san-pham", {
    //       validateStatus: () => {
    //         return true;
    //       },
    //     });
    //     if (result.status === 302) {
    //       setKhuyenMais(result.data);
    //     }
    //   };
      return (
        <div className="container">
          <div>
            <div className="container-fluid">
              <h4 className="text-center pt-1">Thông tin khuyến mại</h4>
    
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
                  <div className="text-center" >
                  <Form.Item >
                    <Button type="primary">Thêm</Button>
                  </Form.Item>
                  </div>
    
                </Form>
              </div>
    
              <div className="text-end">
                <a name="" id="" class="btn btn-warning bg-gradient fw-bold nut-them" href="#" role="button">
                  Thêm khuyến mại
                </a>
              </div>
    
              <div className="container-fluid mt-4" >
                <div>
                  {/* <Table dataSource={khuyenMai} columns={columns} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}