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
  Modal
} from 'antd';
import { InfoCircleFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { PlusCircleFilled } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { MdSearch } from 'react-icons/md';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import FormItem from 'antd/es/form/FormItem';

export default function DanhMuc() {
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
  //Ấn add 
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [bordered] = useState(false);
  const addDanhMuc = (value) => {
    console.log(value);
    axios.post('http://localhost:8080/danh-muc/add', value)
      .then(response => {
        console.log(response.data);
        toast('✔️ Thêm thành công!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        loadDanhMuc();
        form.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

  }
  //Tìm kiếm 
  const handleSubmit = (values) => {

    console.log(`${values.key}`);
    // Send a POST request to the backend
    axios.get(`http://localhost:8080/danh-muc/tim-kiem/${values.key}/${values.timTT}`)
      .then(response => {
        // Update the list of items
        console.log(response.data);
        setDanhMucs(response.data);
        form.resetFields();
      })
      .catch(error => console.error('Error adding item:', error));
  }
  //Table
  const [danhMuc, setDanhMucs] = useState([]);

  useEffect(() => {
    loadDanhMuc();
  }, []);

  const loadDanhMuc = async () => {
    const result = await axios.get("http://localhost:8080/danh-muc", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setDanhMucs(result.data);
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
      title: "Mã",
      dataIndex: "ma",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }, ,
    {
      title: "Tên",
      dataIndex: "ten",
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
  const [form] = Form.useForm();

  return (
    <div>
      <div className="container-fluid">
        <div className='bg-light pb-2 pt-2 mt-2' style={{ borderRadius: 20 }}>
          <h4 className="ms-3 mt-2 mb-2"><FilterFilled /> Bộ lọc</h4>
          <Form className="row"
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
            <div className="col-md-5">
              <Form.Item label="Tên & Mã" name='key'>
                <Input />
              </Form.Item>
            </div>
            <div className='col-md-5'>
              <Form.Item label="Trạng Thái" name='timTT'>
                <Select value={selectedValue} onChange={handleChange}>
                  <Select.Option value="1">Còn Bán</Select.Option>
                  <Select.Option value="0">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className='ms-3'>
              <Button type='primary' size='large' htmlType='submit'><MdSearch />  Tìm Kiếm</Button>
            </Form.Item>
          </Form>
        </div>
        <div className='bg-light pb-2 pt-2 mt-2' style={{ borderRadius: 20 }}>
          <h4 className="ms-3 mt-2 mb-2"><BookFilled /> Danh sách danh mục</h4>
          <div className="ms-3">
            {/* Add danh mục */}
            <a name="" id="" class="btn btn-success mt-2" href="#" role="button" onClick={() => setOpen(true)}> <PlusCircleFilled />  Thêm danh mục</a>
            <Modal
              title="Thêm Danh Mục"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              footer={[
                <Button onClick={() => setOpen(false)}>Hủy</Button>,
                <Button type="primary" onClick={() => {
                  Modal.confirm({
                    title: 'Thông báo',
                    content: 'Bạn có chắc chắn muốn thêm không?',
                    onOk: () => { form.submit(); },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}>Thêm</Button>
              ]}
              width={1000}
            >
              <Form
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1000,
                }}
                onFinish={addDanhMuc}
                form={form}>

                <div className='row'>
                  <div className="col-md-6">
                    <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                      <Input className="border" />
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label="Trạng thái" name='trangThai' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống trạng thái!', },]}>
                      <Select className="border" value={selectedValue} onChange={handleChange}>
                        <Select.Option value="1" >Còn Bán</Select.Option>
                        <Select.Option value="0">Dừng Bán</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={danhMuc} columns={columns} pagination={{ defaultPageSize: 5 }} />
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
  )
}