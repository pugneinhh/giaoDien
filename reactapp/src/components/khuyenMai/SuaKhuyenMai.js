import React, { useState, useEffect, Text, View, Component } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  Checkbox,
  Modal,
} from "antd";
import "./KhuyenMai.scss";
import { LuBadgePercent } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import TableSanPham from "./tableSanPham";
import TableChiTietSanPham from "./tableChiTietSanPham";

const SuaKhuyenMai = () => {
  const [formSuaKhuyenMai] = Form.useForm();

  const { id } = useParams("");
  console.log("id khuyến mại =", id);

  const [CTSP, setCTSP] = useState([]);
  const [idSP, setIDSP] = useState([]);
  const [chua, setChua] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});

  // Hàm xử lý để giữ lại duy nhất một dữ liệu
  const filterUniqueData = (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    const uniqueSet = new Set();
    const uniqueArray = data.filter((item) => {
      if (!uniqueSet.has(item)) {
        uniqueSet.add(item);
        return true;
      }
      return false;
    });
    return uniqueArray;
  };

  const loadDetailKhuyenMai = async () => {
    // Lấy ra chi tiết khuyến mại
    await axios
      .get(`http://localhost:8080/khuyen-mai/detail/${id}`)
      .then((response) => {
        formSuaKhuyenMai.setFieldsValue({
          id: response.data.id,
          ma: response.data.ma,
          loai: response.data.loai,
          ten: response.data.ten,
          khuyen_mai_toi_da: response.data.khuyen_mai_toi_da,
          trang_thai: response.data.trang_thai,
          ngay_bat_dau: moment(
            response.data.ngay_bat_dau,
            "YYYY-MM-DD HH:mm:ss"
          ).locale("vi"),
          ngay_ket_thuc: moment(
            response.data.ngay_ket_thuc,
            "YYYY-MM-DD HH:mm:ss"
          ).locale("vi"),
        });
        setDataUpdate(response.data); // set cho DataUpdate
        loadCTSP();
        loadSP();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const loadCTSP = async () => {
    // Lấy ra ctsp có KM trên
    const x = axios.get(`http://localhost:8080/ctsp/showKM/${dataUpdate.id}`);
    setCTSP(x.data);
    console.log("CTSP lấy từ khuyến mại =", CTSP);

  };

  const loadSP = async () => {
    const resp = CTSP.map((id) =>
      axios.get(`http://localhost:8080/san-pham/showSP/${id}`)
    );
    const apiResponses = await Promise.all(resp);
    console.log(apiResponses);
    //  setIDSP(apiResponses)
    setChua(apiResponses.map((i) => i.data));
    console.log(filterUniqueData(chua));
    setIDSP(filterUniqueData(chua));
    //   Lấy chi tiết sản phẩm theo CTSP
    // for (let i = 0; i < CTSP.length; i++) {
    //   await axios
    //     .get(`http://localhost:8080/san-pham/showSP/${CTSP[i]}`)
    //     .then((response2) => {
    //       // setIDSP((prevData) =>
    //       //   response2.data === prevData
    //       //     ? console.log("trùng:", prevData)
    //       //     : [prevData, ...response2.data]
    //       // );
    //       setChua(response2.data);
    //       console.log("SP lấy từ CTSP từ khuyến mại (response)",response2.data);

    //     });
    // }
  };

  useEffect(() => {
    loadDetailKhuyenMai();
  }, [formSuaKhuyenMai]);

  //  const loadTableSanPham() = async() => {
  //   await axios.get(`http://localhost:8080/ctsp/showKM/${id}`).then((response) => {
  //     setDataUpdate( response.data);
  //     console.log("Form",formSuaKhuyenMai.getFieldValue);
  //     console.log(response.data.ngay_bat_dau);
  //     console.log("Data update 1",dataUpdate);
  //   })
  //   .catch(error => console.error('Error adding item:', error));
  //  }

  const onChangeLoai = (value) => {
    console.log("changed", value);
  };

  const [selectedValue, setSelectedValue] = useState("Tiền mặt");
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [idKM, setIDKM] = useState("");

  // Sử dụng form hiện tại

  const handleSubmit = (value) => {
    axios
      .put(`http://localhost:8080/khuyen-mai/update/${id}`, value)
      .then((response) => {
        // Promise.all(selectedIDCTSP.map(id => axios.put(`http://localhost:8080/ctsp/updateKM/${id}`,response.data)));
        // for(let i = 0; i < selectedIDCTSP.length; i++) {
        //   axios.put(`http://localhost:8080/ctsp/updateKM/${selectedIDCTSP[i]}`,response.data.id)
        // }\
        setIDKM(response.data);
        toast("✔️ Sửa thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSelectedIDSP("");

        formSuaKhuyenMai.resetFields();
      })
      .catch((error) => console.error("Error adding item:", error));

    // Promise.all(selectedIDCTSP.map(id => axios.put(`http://localhost:8080/ctsp/updateKM/${id}`,idKM)));
  };

  const [selectedIDSP, setSelectedIDSP] = useState([]);
  const handleSelectedSanPham = (selectedRowKeys) => {
    setSelectedIDSP(selectedRowKeys);
  };
  const [selectedIDCTSP, setSelectedIDCTSP] = useState([]);

  const handleSelectedCTSanPham = (selectedRowKeys) => {
    setSelectedIDCTSP(selectedRowKeys);
  };

  // Validate ngày
  const validateDateKT = (_, value) => {
    const { getFieldValue } = formSuaKhuyenMai;
    const startDate = getFieldValue("ngay_bat_dau");
    if (startDate && value && value.isBefore(startDate)) {
      return Promise.reject("Ngày kết thúc phải sau ngày bắt đầu");
    }
    return Promise.resolve();
  };
  const [checkNgay, setCheckNgay] = useState(false);
  const validateDateBD = (_, value) => {
    const { getFieldValue } = formSuaKhuyenMai;
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
                form={formSuaKhuyenMai}
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
                    // value={dataUpdate.ma}
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
                    // value={dataUpdate.ten}
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
                    onChange={handleChange}
                    style={{ marginLeft: 20, width: 220 }}
                    // value={dataUpdate.loai}
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
                  {dataUpdate.loai === "Tiền mặt" ||
                  dataUpdate.loai === "Tiền Mặt" ? (
                    <InputNumber
                      // defaultValue={0}
                      // value={dataUpdate.khuyen_mai_toi_da}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      onChange={onChangeLoai}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                  ) : (
                    <InputNumber
                      // defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={onChangeLoai}
                      style={{ marginLeft: 20, width: 220 }}
                      // value={dataUpdate.khuyen_mai_toi_da}
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
                    style={{ marginLeft: 20, width: 220 }}
                    placeholder="Ngày bắt đầu"
                    format={"YYYY-MM-DD HH:mm:ss"}
                    // value={moment(
                    //   dataUpdate.ngay_bat_dau,
                    //   "YYYY-MM-DD HH:mm:ss"
                    // )}
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
                    style={{ marginLeft: 20, width: 220 }}
                    placeholder="Ngày kết thúc"
                    format={"YYYY-MM-DD HH:mm:ss"}
                    // value={moment(
                    //   dataUpdate.ngay_ket_thuc,
                    //   "YYYY-MM-DD HH:mm:ss"
                    // )}
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
                          content: "Bạn có chắc chắn muốn sửa không?",
                          onOk: () => {
                            formSuaKhuyenMai.submit();
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
                      Sửa
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
                <TableSanPham
                  onSelectedSanPham={handleSelectedSanPham}
                  suaIDSP={idSP}
                />
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
export default SuaKhuyenMai;
