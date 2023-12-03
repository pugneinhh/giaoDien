import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Space,
  Table,
  Tag,
} from 'antd';
import { InfoCircleFilled } from "@ant-design/icons";
import { UndoOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { FileImageFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { async } from 'q';
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
  const handleChangeKT = () => {
    setCTDatas({ ...ctData, idKT: ctData.idKT, });
  };
  const { Option } = Select;
  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const { TextArea } = Input;
  const { uuid } = useParams();

  //Mở detail ctsp
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [ctData, setCTDatas] = useState({});
  const [updateData, setUpdateDatas] = useState({});
  const showModal = async (idCT) => {
    const result = await axios.get(`http://localhost:8080/ctsp/detail/${idCT}`, {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 200) {
      setCTDatas(result.data);
    }
    setIsModalOpen(true);
  };


  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    console.log("All values : ",allValues)
    timKiemCT(allValues);
  }
  const timKiemCT = (dataSearch) => {
    axios.post(`http://localhost:8080/ctsp/${uuid}/tim-kiem`, dataSearch)
      .then(response => {
        // Update the list of items
        setCTSPs(response.data);
        console.log("tìm kím:",response.data);
        console.log("UUID : ",uuid)
      })
      .catch(error => console.error('Error adding item:', error));
  }
  //Update
  const updateCT = async () => {
    const updateData = {
      idC: ctData.idC,
      moTa: ctData.moTa,
      idKT: ctData.idKT,
      idMS: ctData.idMS,
      idCL: ctData.idCL,
      idDC: ctData.idDC,
      idDM: ctData.idDM,
      idH: ctData.idH,
      soLuong: ctData.soLuong,
      giaBan: ctData.giaBan,
      trangThai: ctData.trangThai
    }
    console.log(updateData);
  }

  //Load kich thước
  const [kt, setKT] = useState([]);
  useEffect(() => {
    loadKT();
  }, []);
  const loadKT = async () => {
    const result = await axios.get("http://localhost:8080/kich-thuoc", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setKT(result.data);
    }
  };
  //Load Màu Sắc 
  const [ms, setMS] = useState([]);
  useEffect(() => {
    loadMS();
  }, []);
  const loadMS = async () => {
    const result = await axios.get("http://localhost:8080/mau-sac", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setMS(result.data);
    }
  };
  //Load Chất Liệu
  const [cl, setCL] = useState([]);
  useEffect(() => {
    loadCL();
  }, []);
  const loadCL = async () => {
    const result = await axios.get("http://localhost:8080/chat-lieu", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setCL(result.data);
    }
  };
  //Load Độ Cao
  const [dc, setDC] = useState([]);
  useEffect(() => {
    loadDC();
  }, []);
  const loadDC = async () => {
    const result = await axios.get("http://localhost:8080/do-cao", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setDC(result.data);
    }
  };
  //Load Danh Mục
  const [dm, setDM] = useState([]);
  useEffect(() => {
    loadDM();
  }, []);
  const loadDM = async () => {
    const result = await axios.get("http://localhost:8080/danh-muc", {
      validateStatus: () => {
        return true;
      }
    });
      setDM(result.data);
  };
  //Load Chất Liệu
  const [h, setH] = useState([]);
  useEffect(() => {
    loadH();
  }, []);
  const loadH = async () => {
    const result = await axios.get("http://localhost:8080/hang", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setH(result.data);
    }
  };
  //Table
  const [cTSP, setCTSPs] = useState([]);

  useEffect(() => {
    loadCTSP();
  }, []);
  const loadCTSP = async () => {
    const result = await axios.get(`http://localhost:8080/ctsp/showct/${uuid}`, {
      validateStatus: () => {
        return true;
      }
    });
    setCTSPs(result.data);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "idCTSP",
      key: "idCTSP",
      render: (idCTSP, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Hình ảnh",
      dataIndex: "link",
      key: "Link",
      center: "true",
      render: (Link) => {
        return <><Image
          cloudName="dtetgawxc"
          publicId={Link}
          width="100"
          crop="scale"
          href={Link}
        /></>;
      }
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSP",
      center: "true",
      render: (text, record) => (
        <span>{`${record.tenSP} [${record.tenMS}-${record.tenKT}]`}</span>
      ),
      sorter: (a, b) => a.ma - b.ma,
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
            <Tag color="red">
              Dừng Bán
            </Tag>
          ) : (
            <Tag color="green">
              Còn Bán
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "idCTSP",

      render: (title) => (
        <Space size="middle">
          <a>
            <Button type="primary" shape='round' className='bg-success text-white' icon={<EyeOutlined />} onClick={() => showModal(`${title}`)} />
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={700}
              footer={[]}>
              <div className='text-center mb-3'>
                <h3>Chi Tiết Sản Phẩm</h3>
              </div>
              <Form
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={updateCT}
                form={form2}>
                <div className='row'>
                  <Form.Item label={<b>Tên sản phẩm </b>}>
                    <Input readOnly value={ctData.tenSP}></Input>
                  </Form.Item>
                </div>
                <div className='row'>
                  <Form.Item label={<b>Mô tả </b>} hasFeedback rules={[{ required: true, message: 'Vui lòng nhập mô tả!', },]}>
                    <TextArea value={ctData.moTa} onChange={(e) => setCTDatas({ ...ctData, moTa: e.target.value })}></TextArea>
                  </Form.Item>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Kích thước </b>} hasFeedback rules={[{ required: true, message: 'Vui lòng chọn kích thước!', },]}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idKT} onChange={handleChangeKT}>
                        {kt.map(item => (
                          <Select.Option key={item.id} value={item.id} >
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Màu Sắc</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idMS}>
                        {ms.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Chất liệu </b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idCL}>
                        {cl.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Độ cao</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idDC}>
                        {dc.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Danh mục </b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idDM}>
                        {dm.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-6'>
                    <Form.Item label={<b>Hãng</b>}>
                      <Select placeholder="Chọn một giá trị" value={ctData.idH}>
                        {h.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.ten}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Số lượng </b>}>
                      <InputNumber min={0} placeholder='Nhập số lượng' value={ctData.soLuong}></InputNumber>
                    </Form.Item>
                  </div>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Giá bán </b>}>
                      <InputNumber placeholder='Nhập giá bán' value={ctData.giaBan}></InputNumber>
                    </Form.Item>
                  </div>
                  <div className='col-md-4'>
                    <Form.Item label={<b>Trạng thái </b>}>
                      <Select value={ctData.trangThai}>
                        <Select.Option value='1'>Còn Bán</Select.Option>
                        <Select.Option value='0'>Dừng Bán</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </Form>
              <div className='row'>
                <div className='container text-center'>
                  <Button className='bg-warning text-dark rounded-pill border'
                    onClick={() => {
                      Modal.confirm({
                        title: 'Thông báo',
                        content: 'Bạn có chắc chắn muốn cập nhật không?',
                        onOk: () => { form2.submit(); },
                        footer: (_, { OkBtn, CancelBtn }) => (
                          <>
                            <CancelBtn />
                            <OkBtn />
                          </>
                        ),
                      });
                    }}><GrUpdate className='me-1' />Cập Nhật</Button>
                </div>
              </div>
            </Modal>
          </a>
          <a>
            <Button type="primary" shape='round' className='bg-primary text-white' icon={<FileImageFilled />} />         
          </a>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className="container-fluid">
        <div style={{
          marginTop: '50px',
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px', padding: '10px'
        }}>
          <h4 className="ms-3 mt-2 mb-2"><FilterFilled /> Bộ lọc</h4>
          <Form
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
            onValuesChange={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1600,
            }}
            form={form}
          >
            {/* Form tìm kiếm */}
            {/* Các Thuộc Tính Dòng 1 */}
            <div className='row mt-3'>
              {/* Tên & Mã */}
              <div className="col-3">
                <Form.Item label="Tên & Mã" name="tenCT">
                  <Input className="border" />
                </Form.Item>
              </div>
              {/* Kích Thước */}
              <div className='col-3'>
                <Form.Item label="Kích Thước" name="idKT">
                  <Select placeholder="Chọn một giá trị">
                    {kt.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Màu Sắc */}
              <div className='col-3'>
                <Form.Item label="Màu Sắc" name="idMS">
                  <Select placeholder="Chọn một giá trị">
                    {ms.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Chất Liệu */}
              <div className='col-3' >
                <Form.Item label="Chất Liệu" name="idCL">
                  <Select placeholder="Chọn một giá trị">
                    {cl.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            {/* Các Thuộc Tính Dòng 2 */}
            <div className='row'>
              {/* Độ Cao */}
              <div className='col-md-3'>
                <Form.Item label="Độ Cao" name="idDC">
                  <Select placeholder="Chọn một giá trị">
                    {dc.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Danh Mục */}
              <div className='col-md-3'>
                <Form.Item label="Danh Mục" name="idDM">
                  <Select placeholder="Chọn một giá trị">
                    {dm.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Hãng */}
              <div className='col-md-3'>
                <Form.Item label="Hãng" name="idH">
                  <Select defaultValue={null}>
                    <Select.Option value={null}>Tất cả</Select.Option>
                    {h.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.ten}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {/* Trạng Thái */}
              <div className='col-md-3'>
                <Form.Item label="Số Lượng" name="trangThaiCT">
                  <Select defaultValue={null}>
                    <Select.Option value={null}>Tất cả</Select.Option>
                    <Select.Option value='1'>Còn Bán</Select.Option>
                    <Select.Option value='0'>Dừng Bán</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            {/* Các Thuộc Tính Dòng 3 */}
            <div className='row'>
              <div className='col-md-6'>
                <Form.Item label="Số lượng" name="soLuongCT">
                  <InputNumber style={{ width: '400px' }} min={1} />
                </Form.Item>
              </div>
              <div className='col-md-6'>
                <Form.Item label="Giá bán" name="giaBanCT">
                  <InputNumber style={{ width: '400px' }} min={1000} />
                </Form.Item>
              </div>
            </div>
            {/* Hết form tìm kiếm */}
          </Form>
        </div>
        <div style={{
          marginTop: '25px',
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px', padding: '10px'
        }}>
          <h4 className="ms-3 mt-2 mb-2"><BookFilled /> Danh sách Chi Tiết Sản Phẩm</h4>
          <div className="container-fluid mt-4">
            <div>
              <Table className='text-center' dataSource={cTSP} columns={columns} pagination={{ showQuickJumper: true, defaultPageSize: 5, defaultCurrent: 1, total:100}} />
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