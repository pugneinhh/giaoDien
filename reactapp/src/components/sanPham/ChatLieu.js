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
import {MdSearch} from 'react-icons/md';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import FormItem from 'antd/es/form/FormItem';

export default function ChatLieu() {
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
  //Ấn Add
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [bordered] = useState(false);
  const addChatLieu = (value) => {
    console.log(value);
    axios.post('http://localhost:8080/chat-lieu/add', value)
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
        loadChatLieu();
        form.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

  }
  //Table
  const [chatLieu, setChatLieus] = useState([]);

  useEffect(() => {
    loadChatLieu();
  }, []);

  const loadChatLieu = async () => {
    const result = await axios.get("http://localhost:8080/chat-lieu", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setChatLieus(result.data);
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
          <h4 className="ms-3 mt-2 mb-2"><BookFilled /> Danh sách chất liệu</h4>
          <div className="ms-3">
            {/* Add cl */}
            <a name="" id="" class="btn btn-success mt-2" href="#" role="button" onClick={() => setOpen(true)}> <PlusCircleFilled />  Thêm chất liệu</a>
            <Modal
              title="Thêm Chất Liệu"
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
                onFinish={addChatLieu}
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
              <Table className='text-center' dataSource={chatLieu} columns={columns} pagination={{ defaultPageSize: 5 }} />
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