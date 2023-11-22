import React, { useState, useEffect, Text, View, Component , } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Tag,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  DatePicker,
  Divider,
  Pagination,
  Switch,
  Checkbox
} from "antd";
import "./KhuyenMai.scss";
import { LuBadgePercent } from "react-icons/lu";
import TableSanPham from "./tableSanPham";
import TableChiTietSanPham from "./tableChiTietSanPham";


const ThemKhuyenMai = () => {

  const onChangeLoai = (value) => {
    console.log("changed", value);
  };
  
  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };
  const [form] = Form.useForm();

  const [selectedValue, setSelectedValue] = useState("Tiền mặt");
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [selectedIDSP, setSelectedIDSP] = useState([]);
  console.log("IDSP",selectedIDSP);
  const handleSelectedSanPham = (selectedRowKeys) => {
    setSelectedIDSP(selectedRowKeys);
  };


  return (
    <div className="container">
      <div>
        <div className="container-fluid">
          <br />
          <div className="row">
            <div className="bg-light col-md-4" style={{ borderRadius: 20 , marginBottom:10}}>
              <Divider orientation="left" color="none">
                <h4 className="text-first pt-1 fw-bold">
                  <LuBadgePercent /> Thông tin khuyến mại
                </h4>
              </Divider>
              <Form
                // className=" row col-md-12"
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
                <Form.Item
                  label="Mã Khuyến Mại"
                  style={{ marginLeft: 20, width: 400 }}
                >
                  <Input
                    placeholder="Mã khuyến mại"
                    style={{ marginLeft: 20 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Tên Khuyến Mại"
                  style={{ marginLeft: 20, width: 400 }}
                >
                  <Input
                    placeholder="Tên khuyến mại"
                    style={{ marginLeft: 20 }}
                  />
                </Form.Item>
                <Form.Item label="Loại" style={{ marginLeft: 20 }}>
                  <Select
                    value={selectedValue}
                    onChange={handleChange}
                    style={{ marginLeft: 30 }}
                  >
                    <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
                    <Select.Option value="Phần trăm">Phần trăm</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Giảm Tối Đa" style={{ marginLeft: 20 }}>
                  {selectedValue === "Tiền mặt" ? (
                    <InputNumber
                      defaultValue={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      onChange={onChangeLoai}
                      style={{ width: "100%", marginLeft: 30 }}
                    />
                  ) : (
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={onChangeLoai}
                      style={{ width: "100%", marginLeft: 30 }}
                    />
                  )}
                </Form.Item>
                <Form.Item label="Ngày bắt đầu" style={{ marginLeft: 20 }}>
                  <DatePicker
                    style={{ width: "100%", marginLeft: 30 }}
                    placeholder="Ngày bắt đầu"
                  />
                </Form.Item>
                <Form.Item label="Ngày kết thúc" style={{ marginLeft: 20 }}>
                  <DatePicker
                    style={{ width: "100%", marginLeft: 30 }}
                    placeholder="Ngày kết thúc"
                  />
                </Form.Item>

                <div className="text-center">
                  <Form.Item>
                    <Button type="primary">Thêm</Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div className="col" style={{ marginLeft: 20 }}>
                <div className="row bg-light" style={{ borderRadius: 20 }}>
                  <div>
                    <p className="fw-bold" style={{ marginTop: 10 }}>
                      Sản phẩm
                    </p>
                  </div>
                    <TableSanPham onSelectedSanPham={handleSelectedSanPham}/>
                </div>
                <div
                  className="row bg-light"
                  style={{ borderRadius: 20, marginTop: 10 , marginBottom:10}}
                >
                  <div>
                    <p className="fw-bold" style={{ marginTop: 10 }}>
                      Chi Tiết Sản Phẩm
                    </p>
                  </div>
                      <TableChiTietSanPham selectedIDSPs={selectedIDSP}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
export default ThemKhuyenMai;
