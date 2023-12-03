import React, { useState, useEffect, Text, View, Component } from "react";
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
  Divider,
  Pagination,
  Switch,
  Checkbox,
  Modal,
  DatePicker,
} from "antd";
import "./KhuyenMai.scss";
import { LuBadgePercent } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import TableSanPham from "./tableSanPham";
import TableChiTietSanPham from "./tableChiTietSanPham";
import KhuyenMai from "./KhuyenMai";
import { Router, Route } from "react-router-dom";
import vi from "date-fns/locale/vi"; // Import ngôn ngữ tiếng Việt
import moment from "moment-timezone";
const ThemKhuyenMai = () => {


  const [selectedDate, setSelectedDate] = useState(null);

  moment.tz.setDefault("America/New_York");


  const onChangeLoai = (value) => {
    console.log("changed", value);
  };

  const [selectedValue, setSelectedValue] = useState("Tiền mặt");
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [idKM, setIDKM] = useState("");

  // Sử dụng form hiện tại
  const [formThemKhuyenMai] = Form.useForm();

  const handleSubmit = (value) => {
    console.log(value);
    axios
      .post(`http://localhost:8080/khuyen-mai/add`, value)
      .then((response) => {
        Promise.all(
          selectedIDCTSP.map((id) =>
            axios.put(
              `http://localhost:8080/ctsp/updateKM/${id}`,
              response.data
            )
          )
        );
        // for(let i = 0; i < selectedIDCTSP.length; i++) {
        //   axios.put(`http://localhost:8080/ctsp/updateKM/${selectedIDCTSP[i]}`,response.data.id)
        // }\
        setIDKM(response.data);
        console.log("Thêm res", response.data.id);
        toast("✔️ Thêm thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        loadKhuyenMai();
        setSelectedIDSP("");
        formThemKhuyenMai.resetFields();
      })
      .catch((error) => console.error("Error adding item:", error));

    // Promise.all(selectedIDCTSP.map(id => axios.put(`http://localhost:8080/ctsp/updateKM/${id}`,idKM)));
  };

  const [selectedIDSP, setSelectedIDSP] = useState([]);
  console.log("IDSP", selectedIDSP);
  const handleSelectedSanPham = (selectedRowKeys) => {
    setSelectedIDSP(selectedRowKeys);
  };
  const [selectedIDCTSP, setSelectedIDCTSP] = useState([]);

  const handleSelectedCTSanPham = (selectedRowKeys) => {
    setSelectedIDCTSP(selectedRowKeys);
  };
  const [khuyenMai, setKhuyenMais] = useState([]);
  console.log("IDCTSP", selectedIDCTSP);

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

  // Validate ngày
  const validateDateKT = (_, value) => {
    const { getFieldValue } = formThemKhuyenMai;
    const startDate = getFieldValue("ngay_bat_dau");
    if (startDate && value && value.isBefore(startDate)) {
      return Promise.reject("Ngày kết thúc phải sau ngày bắt đầu");
    }
    return Promise.resolve();
  };
  const [checkNgay, setCheckNgay] = useState(false);
  const validateDateBD = (_, value) => {
    const { getFieldValue } = formThemKhuyenMai;
    const endDate = getFieldValue("ngay_ket_thuc");
    if (endDate && value && value.isAfter(endDate)) {
      return Promise.reject("Ngày bắt đầu phải trước ngày kết thúc");
    }

    return Promise.resolve();
  };

  return (
    <div className="container">
      <div>
        <div className="container-fluid">
          <br />
          <div className="row">
            <div
              className="bg-light col-md-4"
              style={{ borderRadius: 20, marginBottom: 10, height: 550 }}
            >
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
                onFinish={handleSubmit}
                form={formThemKhuyenMai}
              >
                <Form.Item
                  label="Mã Khuyến Mại"
                  style={{ marginLeft: 0, width: 500 }}
                  name="ma"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống mã!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Mã khuyến mại"
                    style={{ marginLeft: 20, width: 220 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Tên Khuyến Mại"
                  style={{ marginLeft: 0, width: 500 }}
                  name="ten"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống tên!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Tên khuyến mại"
                    style={{ marginLeft: 20, width: 220 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Loại"
                  name="loai"
                  style={{ marginLeft: 0, width: 500 }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phương thức!",
                    },
                  ]}
                >
                  <Select
                    value={selectedValue}
                    onChange={handleChange}
                    style={{ marginLeft: 20, width: 220 }}
                  >
                    <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
                    <Select.Option value="Phần trăm">Phần trăm</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Giảm Tối Đa"
                  name="khuyen_mai_toi_da"
                  style={{ marginLeft: 0, width: 500 }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá trị giảm tối đa!",
                    },
                  ]}
                >
                  {selectedValue === "Tiền mặt" ? (
                    <InputNumber
                      defaultValue={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      onChange={onChangeLoai}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                  ) : (
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={onChangeLoai}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  label="Ngày bắt đầu"
                  name="ngay_bat_dau"
                  style={{ marginLeft: 0, width: 500 }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày bắt đầu!",
                    },
                    { validator: validateDateBD },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ marginLeft: 20, width: 220 }}
                    placeholder="Ngày bắt đầu"
                  />
                </Form.Item>
                <Form.Item
                  label="Ngày kết thúc"
                  name="ngay_ket_thuc"
                  style={{ marginLeft: 0, width: 500 }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày kết thúc!",
                    },
                    { validator: validateDateKT },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ marginLeft: 20, width: 220 }}
                    placeholder="Ngày kết thúc"
                  />
                </Form.Item>

                <div className="text-end" style={{ marginTop: 50 }}>
                  <Form.Item>
                    <Button
                      type="primary"
                      className=" bg-warning rounded-pill"
                      onClick={() => {
                        Modal.confirm({
                          title: "Thông báo",
                          content: "Bạn có chắc chắn muốn thêm không?",
                          onOk: () => {
                            formThemKhuyenMai.submit();
                            // form.finish();
                          },
                          footer: (_, { OkBtn, CancelBtn }) => (
                            <>
                              <CancelBtn />
                              <OkBtn />
                            </>
                          ),
                        });
                      }}
                    >
                      Thêm
                    </Button>
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
                <TableSanPham onSelectedSanPham={handleSelectedSanPham} />
              </div>
              <div
                className="row bg-light"
                style={{ borderRadius: 20, marginTop: 10, marginBottom: 10 }}
              >
                <div>
                  <p className="fw-bold" style={{ marginTop: 10 }}>
                    Chi Tiết Sản Phẩm
                  </p>
                </div>
                <TableChiTietSanPham
                  selectedIDSPs={selectedIDSP}
                  onSelectedCTSanPham={handleSelectedCTSanPham}
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </div>
  );
};
export default ThemKhuyenMai;
