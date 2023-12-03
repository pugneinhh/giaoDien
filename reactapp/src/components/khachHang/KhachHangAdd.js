import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AdressClientApi } from "../diaChi/diaChiApi";
import { Option } from "antd/es/mentions";

const AddKhachHang = () => {
  const [selectedValue, setSelectedValue] = useState("1");
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const fetchData = async () => {
    try {
      const provincesResponse = await AdressClientApi.getAllProvince();
      setProvinces(provincesResponse.data.data);
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };
  useEffect(() => {
    // Lấy dữ liệu về tỉnh/thành phố từ API
    fetchData();
  }, []);

  // Xử lý khi chọn tỉnh/thành phố
  const handleProvinceChange = async (codeProvince) => {
    try {
      const districtsResponse = await AdressClientApi.getAllDistrict(
        codeProvince
      );
      setDistricts(districtsResponse.data.data);
      console.log(districtsResponse.data.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  // Xử lý khi chọn quận/huyện
  const handleDistrictChange = async (codeDistrict) => {
    try {
      const wardsResponse = await AdressClientApi.getAllWard(codeDistrict);
      setWards(wardsResponse.data.data);
      console.log(wardsResponse.data);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };
  const handleSubmit = (value) => {
    console.log(value);
    axios
      .post("http://localhost:8080/khach-hang/add", value)
      .then((response) => {
        // Update the list of items
        console.log(response.data);
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

        form.resetFields();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  return (
    <div
      className="container-fluid bg-light m-2 p-3 pt-2"
      style={{
        border: "1px solid #ddd",
        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <h4 className="text-center">Thêm khách hàng</h4>
      <Form
        className="row col-md-12 mt-3"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 1000,
        }}
        onFinish={handleSubmit}
        form={form}
      >
        <div className="col-md-4">
          <Form.Item
            label="Mã Khách Hàng"
            name="ma"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống mã!",
              },
            ]}
          >
            <Input placeholder="Mã Khách Hàng" className="border-warning" />
          </Form.Item>
          <Form.Item
            label="Tên Khách Hàng"
            name="ten"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống tên!",
              },
            ]}
          >
            <Input placeholder="Tên khách hàng" className="border-warning" />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống email!",
              },
            ]}
          >
            <Input placeholder="Email" className="border-warning" />
          </Form.Item>
          <Form.Item
            label="Số CCCD"
            name="cccd"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống CCCD!",
              },
            ]}
          >
            <Input placeholder="CCCD" className="border-warning" />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item label="Giới tính" name="gioiTinh">
            <Select value={selectedValue} onChange={handleChange}>
              <Select.Option value="0">Nam</Select.Option>
              <Select.Option value="1">Nữ</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            label="Số Điện thoại"
            name="soDienThoai"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống số điện thoại!",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" className="border-warning" />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="ngaySinh"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày sinh!",
              },
            ]}
          >
            <DatePicker
              showTime
              style={{ width: "100%" }}
              className="border-warning"
              placeholder="Ngày sinh"
            />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item label="Thành phố">
            <Select onChange={handleProvinceChange}>
              {provinces?.map((item) => {
                return (
                  <Option
                    key={item.ProvinceID}
                    value={item.ProvinceName}
                    valueProvince={item.ProvinceID}
                  >
                    {item.ProvinceName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* Dropdown cho quận/huyện */}
          <Form.Item label="Huyện">
            <Select onChange={handleDistrictChange}>
              {districts?.map((district) => {
                return (
                  <Option
                    key={district.DistrictID}
                    value={district.DistrictName}
                    valueProvince={district.DistrictID}
                  >
                    {district.DistrictName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="col-md-4">
          {/* Dropdown cho xã/phường */}
          <Form.Item label="Xã">
            <Select>
              {wards?.map((ward) => {
                return (
                  <Option
                    key={ward.DistrictID}
                    value={ward.WardName}
                    valueProvince={ward.DistrictID}
                  >
                    {ward.WardName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-1"></div>
        <div className="col-md-4">
          <Button
            type="primary"
            onClick={() => {
              Modal.confirm({
                title: "Thông báo",
                content: "Bạn có chắc chắn muốn thêm không?",
                onOk: () => {
                  form.submit();
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
        </div>
      </Form>

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
  );
};
export default AddKhachHang;
