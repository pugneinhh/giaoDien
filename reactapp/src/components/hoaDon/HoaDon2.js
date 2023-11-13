import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button, DatePicker, Form, Select, Space, Table } from 'antd';
import './HoaDon.scss';
import { Tabs, Tag } from 'antd';
import { BsFillEyeFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import moment from "moment";
import Input from 'antd/es/input/Input';
export default function HoaDon() {
    const [hoaDon, setHoaDons] = useState([])
    useEffect(() => {
        loadHoaDon();

    }, []);

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
            render: (trangThai) => (
                <>
                    {
                        (trangThai == 0) ?
                            (
                                <Tag color="#00cc00">
                                    Chờ xác nhận
                                </Tag>
                            ) :
                            (trangThai == 1) ?
                                (
                                    <Tag color="#ff0000">
                                        Xác nhận
                                    </Tag>
                                ) :
                                (trangThai == 2) ?
                                    (
                                        <Tag color="#ff0000">
                                            Chờ vận chuyển
                                        </Tag>
                                    ) :
                                    (trangThai == 3) ?
                                        (
                                            <Tag color="#ff0000">
                                                Vận chuyển
                                            </Tag>
                                        ) :
                                        (trangThai == 4) ?
                                            (
                                                <Tag color="#ff0000">
                                                    Thanh toán
                                                </Tag>
                                            ) :
                                            (trangThai == 5) ?
                                                (
                                                    <Tag color="#ff0000">
                                                        Hoàn thành
                                                    </Tag>
                                                ) :
                                                (trangThai == 6) ?
                                                    (
                                                        <Tag color="#ff0000">
                                                            Hủy
                                                        </Tag>
                                                    ) :
                                                    (
                                                        <Tag color="">
                                                            Đã thanh toán
                                                        </Tag>
                                                    )
                    }
                </>),
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
            title: 'Action',
            key: 'action',

            render: () => (
                <Space size="middle">
                    <Link to='/hoa-don-detail' className='btn btn-danger'><BsFillEyeFill /></Link>
                </Space>
            ),
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Tất cả',
            children: <Table dataSource={hoaDon} columns={columns} />,
        },
        {
            key: '2',
            label: 'Chờ xác nhận',
            children: <Table dataSource={hoaDonCho} columns={columns} />,
        },
        {
            key: '3',
            label: 'Xác nhận',
            children: <Table dataSource={hoaDonXN} columns={columns} />,
        },
        {
            key: '4',
            label: 'Chờ vận chuyển',
            children: <Table dataSource={hoaDonXN} columns={columns} />,
        },
        {
            key: '5',
            label: 'Vận chuyển',
            children: <Table dataSource={hoaDonXN} columns={columns} />,
        },
        {
            key: '6',
            label: 'Thanh toán',
            children: <Table dataSource={hoaDonXN} columns={columns} />,
        },
        {
            key: '7',
            label: 'Hoàn thành',
            children: <Table dataSource={hoaDonXN} columns={columns} />,
        },
        {
            key: '8',
            label: 'Hủy',
            children: <Table dataSource={hoaDonXN} columns={columns} />,
        },
    ];

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
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
                >
                    <div className="col-md-6">
                        <Form.Item label="Tìm kiếm">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Phương thức">
                            <Select >
                                <Select.Option value="Tại quầy">Tại quầy</Select.Option>
                                <Select.Option value="Online">Online</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='col-md-6'>
                        <Form.Item label="Ngày bắt đầu">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Ngày kết thúc">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                 
                    <Form.Item className='text-end '>
                            <Button type="primary" >Tìm kiếm</Button>
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
