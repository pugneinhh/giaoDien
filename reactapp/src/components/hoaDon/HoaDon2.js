import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button, DatePicker, Form, Select, Space, Table } from 'antd';
import './HoaDon.scss';
import { Tabs, Tag } from 'antd';
import { BsFillEyeFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import moment from "moment";
import Input from 'antd/es/input/Input';
import { FormattedNumber, IntlProvider } from 'react-intl';

export default function HoaDon() {
 
    // tìm kiếm

    const tim = (values) => {
        // Send a POST request to the backend
            // Send a POST request to the backend
            axios.get(`http://localhost:8080/hoa-don/tim-kiem/${values.key}/${values.timLoai}/${moment(values.ngayBD).format('YYYY-MM-DD')}/${moment(values.ngayKT).format('YYYY-MM-DD')}`)
                .then(response => {
                    // Update the list of items
                    setHoaDons(response.data);
                    form.resetFields();

                })
                .catch(error => console.error('Error adding item:', error));
    
        console.log(moment(values.ngayBD));
        console.log(moment(values.ngayKT).format('YYYY-MM-DD'));
        console.log(moment(values.ngayKT));
    }

    const [hoaDon, setHoaDons] = useState([])
    useEffect(() => {
        loadHoaDon();

    }, []);
    // load full hóa đơn
    const loadHoaDon = async () => {

        const result = await axios.get('http://localhost:8080/hoa-don', {
            validateStatus: () => {
                return true;
            },
        });
        if (result.status === 302) {
            setHoaDons(result.data);
        }


    };
    const [hoaDonCho, setHoaDonsCho] = useState([])
    useEffect(() => {
        loadHoaDonCho();

    }, []);
    const loadHoaDonCho = async () => {

        const result = await axios.get('http://localhost:8080/hoa-don/0', {
            validateStatus: () => {
                return true;
            },
        });
        if (result.status === 302) {
            setHoaDonsCho(result.data);
        }


    };
    const [hoaDonXN, setHoaDonsXN] = useState([])
    useEffect(() => {
        loadHoaDonXN();

    }, []);
    const loadHoaDonXN = async () => {

        const result = await axios.get('http://localhost:8080/hoa-don/1', {
            validateStatus: () => {
                return true;
            },
        });
        if (result.status === 302) {
            setHoaDonsXN(result.data);
        }
        // console.log(result.data);

    };
    const [hoaDonCVC, setHoaDonCVC] = useState([])
    useEffect(() => {
        loadHoaDonCVC();

    }, []);
    const loadHoaDonCVC = async () => {

        const result = await axios.get('http://localhost:8080/hoa-don/2', {
            validateStatus: () => {
                return true;
            },
        });
        if (result.status === 302) {
            setHoaDonCVC(result.data);
        }
        // console.log(result.data);

    };
    const [hoaDonVC, setHoaDonVC] = useState([])
    useEffect(() => {
        loadHoaDonVC();

    }, []);
    const loadHoaDonVC = async () => {

        const result = await axios.get('http://localhost:8080/hoa-don/3', {
            validateStatus: () => {
                return true;
            },
        });
        if (result.status === 302) {
            setHoaDonVC(result.data);
        }
        // console.log(result.data);

    };
    const [hoaDonTT, setHoaDonTT] = useState([])
    useEffect(() => {
        loadHoaDonTT();

    }, []);
    const loadHoaDonTT = async () => {

        const result = await axios.get('http://localhost:8080/hoa-don/4', {
            validateStatus: () => {
                return true;
            },
        });
        if (result.status === 302) {
            setHoaDonTT(result.data);
        }
        // console.log(result.data);

    };
    const [hoaDonHT, setHoaDonHT] = useState([])
    useEffect(() => {
        loadHoaDonHT();

    }, []);
    const loadHoaDonHT = async () => {

        const result = await axios.get('http://localhost:8080/hoa-don/5', {
            validateStatus: () => {
                return true;
            },
        });
        if (result.status === 302) {
            setHoaDonHT(result.data);
        }
        // console.log(result.data);

    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (id, record, index) => { ++index; return index },
            showSortTooltip: false,

        },
        {
            title: 'Mã hóa đơn',
            dataIndex: 'ma',
            center: "true",

            sorter: (a, b) => a.ma - b.ma,
        },
        {
            title: 'Mã NV',
            dataIndex: 'maNV',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],

            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'tenKH',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'SDT KH',
            dataIndex: 'sdt',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Loại HĐ',
            dataIndex: 'loaiHD',
            key: 'loaiHD',
            render: (trangThai) => (
                <>
                    {
                        (trangThai == 0) ?
                            (
                                <Tag color="#00cc00">
                                    Online
                                </Tag>
                            ) :

                            (
                                <Tag color="#FFD700">
                                    Tại quầy
                                </Tag>
                            )
                    }
                </>),
            filters: [
                {
                    text: 'Online',
                    value: '0',
                },
                {
                    text: 'Tại quầy',
                    value: '1',
                },

            ],
            onFilter: (value, record) => record.loaiHD.indexOf(value) === 0,
        },
        {
            title: 'Ngày mua',

            dataIndex: 'ngayMua',
            render: (ngayMua) => (
                <>{moment(ngayMua).format("hh:mm:ss DD/MM/YYYY")}</>
            ),
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Thành tiền ',
            dataIndex: 'thanhTien',
            render: (thanhTien) => (
                <IntlProvider locale='vi-VN'>
                    <div>
                        <FormattedNumber
                            value={thanhTien}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                        />
                    </div>
                </IntlProvider>
            ),
             
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            center: 'true',
            render: (trangThai) => (
                <>
                    {
                        (trangThai == 0) ?
                            (
                                
                                <Tag color="red">
                                    Chờ xác nhận
                                </Tag>
                            ) :
                            (trangThai == 1) ?
                                (
                                    <Tag color="purple">
                                        Xác nhận
                                    </Tag>
                                ) :
                                (trangThai == 2) ?
                                    (
                                        <Tag color="geekblue">
                                            Chờ vận chuyển
                                        </Tag>
                                    ) :
                                    (trangThai == 3) ?
                                        (
                                            <Tag color="blue">
                                                Vận chuyển
                                            </Tag>
                                        ) :
                                        (trangThai == 4) ?
                                            (
                                                <Tag color="cyan">
                                                    Thanh toán
                                                </Tag>
                                            ) :
                                            (trangThai == 5) ?
                                                (
                                                    <Tag color="green">
                                                        Hoàn thành
                                                    </Tag>
                                                ) :
                                                (trangThai == 6) ?
                                                    (
                                                        <Tag color="lime">
                                                            Hủy
                                                        </Tag>
                                                    ) :
                                                    (
                                                        <Tag color="gold">
                                                            Đã thanh toán
                                                        </Tag>
                                                    )
                    }
                </>),
            filters: [
                {
                    text: 'London',
                    value: '0',
                },
                {
                    text: 'New York',
                    value: '1',
                },
            ],
            onFilter: (value, record) => record.trangThai.indexOf(value) === 0,
           
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'idHD',
            
            render: (title) => (
                <Space size="middle">
                    <Link to={`/detail-hoa-don/${title}`} className='btn btn-danger'><BsFillEyeFill /></Link>
                </Space>
            ),
            center: 'true',
        },
       
    ];

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Tất cả',
            children: <Table dataSource={hoaDon} columns={columns} pagination={{ defaultPageSize: 5, position: ['bottomCenter'] }} />,
        },
        {
            key: '2',
            label: 'Chờ xác nhận',
            children: <Table dataSource={hoaDonCho} columns={columns} pagination={{ defaultPageSize: 5, position: ['bottomCenter'] }} />,
        },
        {
            key: '3',
            label: 'Xác nhận',
            children: <Table dataSource={hoaDonXN} columns={columns} pagination={{ defaultPageSize: 5, position: ['bottomCenter'] }} />,
        },
        {
            key: '4',
            label: 'Chờ vận chuyển',
            children: <Table dataSource={hoaDonCVC} columns={columns} pagination={{ defaultPageSize: 5, position: ['bottomCenter'] }} />,
        },
        {
            key: '5',
            label: 'Vận chuyển',
            children: <Table dataSource={hoaDonVC} columns={columns} pagination={{ defaultPageSize: 5, position: ['bottomCenter'] }} />,
        },
        {
            key: '6',
            label: 'Thanh toán',
            children: <Table dataSource={hoaDonTT} columns={columns} pagination={{ defaultPageSize: 5, position: ['bottomCenter'] }} />,
        },
        {
            key: '7',
            label: 'Hoàn thành',
            children: <Table dataSource={hoaDonHT} columns={columns} pagination={{ defaultPageSize: 5, position: ['bottomCenter'] }} />,
        },
        {
            key: '8',
            label: 'Hủy',
            children: <Table dataSource={hoaDonXN} columns={columns} pagination={{ defaultPageSize: 5, position: ['bottomCenter'] }} />,
        },
    ];

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    // tìm kiếm trong from
    const [form] = Form.useForm();


  
    return (
        <div className='container'>
            {/* lọc hóa đơn */}
            <div className='container-fluid row'>
                <h4 className='pt-1' >Lọc</h4>
                <Form className="row col-md-12"
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
                    onFinish={tim}
                    form={form}
                >
                    <div className="col-md-6">
                        <Form.Item label="Tìm kiếm"  name='hehe'>
                            <Input required className="rounded-pill border-warning" />
                        </Form.Item>
                        <Form.Item label="Loại HD" className="rounded-pill border-warning" name='timLoai'>
                            <Select className="rounded-pill border-warning" >
                                <Select.Option className="rounded-pill border-warning" value="1">Tại quầy</Select.Option>
                                <Select.Option className="rounded-pill border-warning" value="0">Online</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='col-md-6'>
                        <div className='col-md-12'>
                            <Form.Item label="Ngày bắt đầu" name='ngayBD'>
                                <DatePicker className='rounded-pill border-warning' placeholder='Ngày bắt đầu' style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                        <div className='col-md-12'>
                            <Form.Item label="Ngày kết thúc" name='ngayKT'>
                                <DatePicker className='rounded-pill border-warning' placeholder='Ngày kết thúc' style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                    </div>
               
                    <Form.Item className='text-end '>
                        <Button type="primary" htmlType='submit' >Tìm kiếm</Button>
                        </Form.Item>
                 


                </Form>

            </div>
            {/* bảng hóa đơn */}
            <div className='container-fluid'>
                <h4 className='' >Danh sách hóa đơn</h4>

                <div className='container-fluid mt-2'>
                    <div>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

                    </div>
                </div>
            </div>



        </div>
    )

}
