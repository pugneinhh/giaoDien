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
import { UndoOutlined } from "@ant-design/icons";
import { MdSearch } from 'react-icons/md';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import FormItem from 'antd/es/form/FormItem';
import { set } from 'date-fns';

export default function DanhMuc() {
  //Form
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [form] = Form.useForm();
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
  const onChangeFilter = (changedValues, allValues) => {
    timKiemDanhMuc(allValues);
  }
  const timKiemDanhMuc = (dataSearch) => {
    axios.post('http://localhost:8080/danh-muc/tim-kiem', dataSearch)
      .then(response => {
        // Update the list of items
        setDanhMucs(response.data);
        console.log("tìm kím:", response.data);
      })
      .catch(error => console.error('Error adding item:', error));
  }
  //Table
  const [danhMuc, setDanhMucs] = useState([]);

  useEffect(() => {
    loadDanhMuc();
  },[]);

  const loadDanhMuc = async () => {
    await axios.get('http://localhost:8080/danh-muc')
        .then(response => {
          // Update the list of items
          setDanhMucs(response.data);
      })
      .catch(error => console.error('Error adding item:', error));
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
      sorter: (a, b) => a.ma.slice(2) - b.ma.slice(2),
    }, ,
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai) => (
        <>
          {
            (trangThai == 0) ?
              (
                <Tag color="red">
                  Dừng bán
                </Tag>
              ) : (trangThai == 1) ?
                <Tag color="green">
                  Còn bán
                </Tag>
                : <Tag color="red">
                  Ngừng hoạt động
                </Tag>

          }
        </>),
      filters: [
        {
          text: 'Dừng bán',
          value: '0',
        },
        {
          text: 'Còn bán',
          value: '1',
        },

      ],
      onFilter: (value, record) => record.trangThai === parseInt(value),
    },
    {
      title: "Action",
      key: "action",

      render: () => (
        <Space size="middle">
          <a>
            <Button type="primary" primary shape="circle" icon={<InfoCircleFilled size={20} />} />
          </a>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className="container-fluid">
        <div style={{
          marginTop : '50px',
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px', padding: '10px'
        }}>
          <h4 className="ms-3 mt-2 mb-2"><FilterFilled /> Bộ lọc</h4>
          <Form className="row"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1400,

            }}
            form={form}
          >
            <div className="col-md-5">
              <Form.Item label="Tên & Mã" name='tenDM'>
                <Input />
              </Form.Item>
            </div>
            <div className='col-md-5'>
              <Form.Item label="Trạng Thái" name='trangThaiDM'>
                <Select defaultValue={null}>
                  <Select.Option value={null}>Tất cả</Select.Option>
                  <Select.Option value='0'>Dừng Bán</Select.Option>
                  <Select.Option value='1' >Còn Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div style={{
          marginTop : '50px',
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px', padding: '10px'
        }}>
          <h4 className="ms-3 mt-2 mb-2"><BookFilled /> Danh sách danh mục</h4>
          <div className="ms-3">
            {/* Add danh mục */}
            <a name="" id="" className="btn btn-success mt-2" href="#" role="button" onClick={() => setOpen(true)}> <PlusCircleFilled />  Thêm danh mục</a>
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
              width={500}
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
                  <div className="container">
                    <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                      <Input className="border" />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center'
                dataSource={danhMuc}
                columns={columns}
                pagination={{ showQuickJumper: true, defaultPageSize: 4, defaultCurrent: 1, total:100}}
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
  )
}