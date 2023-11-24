import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    Modal
} from 'antd';
import { Link } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Cascader } from 'antd';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import "./SanPham.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import FormItem from 'antd/es/form/FormItem';


export default function AddSanPham() {
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
    const onChange = (value) => {
        console.log(value);
    };
    const [form] = Form.useForm();

    //Load Kích Thước
    const [openKT, setOpenKT] = useState(false);
    const [ktData, setKTData] = useState([]);
    const [optionsKT, setOptionsKT] = useState([]);
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
            setKTData(result.data);
            const loadOKT = result.data.map(item => ({
                key: item.id,
                value: item.id,
                label: item.ten,
            }));
            setOptionsKT(loadOKT);
        }
    };
    const addKichThuoc = (value) => {
        console.log(value);
        axios.post('http://localhost:8080/kich-thuoc/add', value)
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
                loadKT();
                form.resetFields();

            })
            .catch(error => console.error('Error adding item:', error));

    }

    // Load Màu Sắc
    const [openMS, setOpenMS] = useState(false);
    const [msData, setMSData] = useState([]);
    const [optionsMS, setOptionsMS] = useState([]);
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
            setMSData(result.data);
            const loadOMS = result.data.map(item => ({
                key: item.id,
                value: item.id,
                label: item.ten,
            }));
            setOptionsMS(loadOMS);
        }
    };
    const addMauSac = (value) => {
        console.log(value);
        axios.post('http://localhost:8080/mau-sac/add', value)
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
                loadMS();
                form.resetFields();

            })
            .catch(error => console.error('Error adding item:', error));

    }

    // Load Chất Liệu
    const [openCL, setOpenCL] = useState(false);
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
                loadCL();
                form.resetFields();

            })
            .catch(error => console.error('Error adding item:', error));

    }

    // Load Độ Cao
    const [openDC, setOpenDC] = useState(false);
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
    const addDoCao = (value) => {
        console.log(value);
        axios.post('http://localhost:8080/do-cao/add', value)
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
                loadDC();
                form.resetFields();

            })
            .catch(error => console.error('Error adding item:', error));

    }

    // Load Danh Mục
    const [openDM, setOpenDM] = useState(false);
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
        if (result.status === 302) {
            setDM(result.data);
        }
    };
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
                loadDM();
                form.resetFields();

            })
            .catch(error => console.error('Error adding item:', error));

    }

    // Load Hãng
    const [openH, setOpenH] = useState(false);
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
    const addHang = (value) => {
        console.log(value);
        axios.post('http://localhost:8080/hang/add', value)
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
                loadH();
                form.resetFields();

            })
            .catch(error => console.error('Error adding item:', error));

    }

    //Hiển Thị 
    return (
        <div>
            <div className="container-fluid">
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
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                >
                    <div className='bg-light pb-2 pt-2 mt-2' style={{ borderRadius: 20 }}>
                        <h5 className="text-start mb-4 ms-3"><IoIosAddCircleOutline /> Thêm Sản Phẩm</h5>

                        <Form.Item label={<b>Tên Sản Phẩm </b>}>
                            <Input placeholder='Nhập tên sản phẩm ' className='w-75' />
                        </Form.Item>
                        <Form.Item label={<b>Mô tả </b>}>
                            <TextArea rows={5} placeholder='Nhập mô tả sản phẩm' className='w-75' />
                        </Form.Item>
                        {/* Chất Liệu */}
                        <Form.Item label={<b>Chất liệu </b>}>
                            <Select placeholder="Chọn một giá trị" className='w-75 me-2'>
                                {cl.map(item => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button className='bg-primary text-white w-1' onClick={() => setOpenCL(true)}> + </Button>
                            <Modal
                                title="Thêm Chất Liệu"
                                centered
                                open={openCL}
                                onOk={() => setOpenCL(false)}
                                onCancel={() => setOpenCL(false)}
                                footer={[
                                    <Button onClick={() => setOpenCL(false)}>Hủy</Button>,
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
                                    onFinish={addChatLieu}
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
                            {/* Hãng */}
                        </Form.Item>
                        {/* Hãng */}
                        <Form.Item label={<b>Hãng </b>}>
                            <Select placeholder="Chọn một giá trị" className='w-75 me-2'>
                                {h.map(item => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button className='bg-primary text-white w-1' onClick={() => setOpenH(true)}> + </Button>
                            <Modal
                                title="Thêm Hãng"
                                centered
                                open={openH}
                                onOk={() => setOpenH(false)}
                                onCancel={() => setOpenH(false)}
                                footer={[
                                    <Button onClick={() => setOpenH(false)}>Hủy</Button>,
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
                                    onFinish={addHang}
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
                        </Form.Item>
                        {/* Độ cao */}
                        <Form.Item label={<b>Độ cao </b>}>
                            <Select placeholder="Chọn một giá trị" className='w-75 me-2' onChange={onChange}>
                                {dc.map(item => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button className='bg-primary text-white' onClick={() => setOpenDC(true)}> + </Button>
                            <Modal
                                title="Thêm Độ Cao"
                                centered
                                open={openDC}
                                onOk={() => setOpenDC(false)}
                                onCancel={() => setOpenDC(false)}
                                footer={[
                                    <Button onClick={() => setOpenDC(false)}>Hủy</Button>,
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
                                    onFinish={addDoCao}
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
                        </Form.Item>
                        {/* Danh mục */}
                        <Form.Item label={<b>Danh mục </b>}>
                            <Select placeholder="Chọn một giá trị" className='w-75 me-2'>
                                {dm.map(item => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button className='bg-primary text-white w-1' onClick={() => setOpenDM(true)}> + </Button>
                            <Modal
                                title="Thêm Danh Mục"
                                centered
                                open={openDM}
                                onOk={() => setOpenDM(false)}
                                onCancel={() => setOpenDM(false)}
                                footer={[
                                    <Button onClick={() => setOpenDM(false)}>Hủy</Button>,
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
                        </Form.Item>
                        <div className='bg-light pb-2 pt-2 mt-2' style={{ borderRadius: 20 }}>
                            <h5 className="text-start mb-4 ms-3"><MdAddTask /> Kích thước & Màu sắc</h5>
                            {/* Kích Thước */}
                            <Form.Item label={<b>Kích thước </b>}>
                                <Cascader
                                    style={{
                                        width: '75%',
                                        height: '50px'
                                    }}
                                    className='me-2'
                                    options={optionsKT}
                                    onChange={onChange}
                                    multiple
                                    maxTagCount="responsive"
                                />
                                <Button className='bg-primary text-white w-1' onClick={() => setOpenKT(true)}> + </Button>
                                <Modal
                                    title="Thêm Kích Thước"
                                    centered
                                    open={openKT}
                                    onOk={() => setOpenKT(false)}
                                    onCancel={() => setOpenKT(false)}
                                    footer={[
                                        <Button onClick={() => setOpenKT(false)}>Hủy</Button>,
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
                                        onFinish={addKichThuoc}
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
                                <br />
                            </Form.Item>
                            {/* Màu Sắc */}
                            <Form.Item label={<b>Màu sắc </b>}>
                                <Cascader
                                    style={{
                                        width: '75%',
                                        height: '50px'
                                    }}
                                    className='me-2'
                                    options={optionsMS}
                                    onChange={onChange}
                                    multiple
                                    maxTagCount="responsive"
                                />
                                <Button className='bg-primary text-white w-1' onClick={() => setOpenMS(true)}> + </Button>
                                <Modal
                                    title="Thêm Màu Sắc"
                                    centered
                                    open={openMS}
                                    onOk={() => setOpenMS(false)}
                                    onCancel={() => setOpenMS(false)}
                                    footer={[
                                        <Button onClick={() => setOpenMS(false)}>Hủy</Button>,
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
                                        onFinish={addMauSac}
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
                            </Form.Item>
                            <div className='text-center'>
                                <Form.Item >
                                    <Button className='ms-3 me-2' href='/san-pham'>Hủy</Button>
                                    <Button className='bg-success text-white'>Thêm Sản Phẩm</Button>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
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