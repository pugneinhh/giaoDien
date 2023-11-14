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
} from 'antd';
import {FilterFilled , UnorderedListOutlined}  from "@ant-design/icons";
import {MdDeleteForever} from 'react-icons/md';
import {IoInformation } from 'react-icons/io5';
import {BsPencilSquare} from 'react-icons/bs';
import axios from 'axios';
const onChange = (value) => {
    console.log('changed', value);
  };

const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

const Voucher = ()=>{
    //của form voucher
    const [selectedValue, setSelectedValue] = useState('Tiền mặt');
    const handleChange = (value) => {
        console.log(`Selected value: ${value}`);
        setSelectedValue(value);
      };
    

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };
    ///call api

    const[voucher,setVouchers]=useState([])
    useEffect(()=>{
        loadVoucher();
       
    },[]);
  
    const loadVoucher=async()=>{
       
        const result = await axios.get('http://localhost:8080/voucher', {
            validateStatus: () => {
                return true;
            },
        });
        if (result.status === 302) {
            setVouchers(result.data); 
        }  
    
      
    };
    //của table
    //table


const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    key: 'id',
    render: (id,record,index) => {++index; return index},
    showSortTooltip:false,

},
  {
    title: 'Mã Voucher',
    dataIndex: 'ma',
    sorter: (a, b) => a.ma - b.ma,
  },
  {
    title: 'Phương thức',
    dataIndex: 'phuongThuc',
    sorter: (a, b) => a.phuongThuc - b.phuongThuc,
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'ngayBatDau',
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
    title: 'Ngày kết thúc',
    dataIndex: 'ngayKetThuc',
    sorter: (a, b) => a.ngayKetThuc - b.ngayKetThuc,
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
                                <Tag color="green">
                                    Hoạt động
                                </Tag>
                            ) :
                            
                                    <Tag color="red">
                                        Ngừng hoạt động
                                    </Tag>
                              
                    }
                </>),
    filters: [
      {
        text: 'Hoạt động',
        value: 'Hoạt động',
      },
      {
        text: 'Ngừng hoạt động',
        value: 'Ngừng hoạt động',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>
        <Button  danger shape="circle" icon={<IoInformation size={22} />}  />
        </a>
        <a>
        <Button success shape="circle" icon={<BsPencilSquare size={22} />}  />
        </a>
        <a>
          <Button type="primary" danger shape="circle" icon={<MdDeleteForever size={20} />}  />
        </a>
      </Space>
    ),
  },
];

    const [bordered] = useState(false);
    const [size] = useState('large');
    const [expandable] = useState(undefined);
    const [showHeader] = useState(true);
    const [rowSelection] = useState({});
    const [hasData] = useState(true);
    const [tableLayout] = useState();
    const [top] = useState('none');
    const [bottom] = useState('bottomCenter');
    const [ellipsis] = useState(false);
    const [yScroll] = useState(false);
    const [xScroll] = useState();
    
    const scroll = {};
    if (yScroll) {
      scroll.y = 240;
    }
    if (xScroll) {
      scroll.x = '100vw';
    }
    const tableColumns = columns.map((item) => ({
      ...item,
      ellipsis,
    }));
    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }
    const tableProps = {
      bordered,
      size,
      expandable,
      showHeader,
      scroll,
      tableLayout,
    };

    return (
        <div className="container border border-bg-dark-subtle border-2 m-2 row" style={{borderRadius:20}}>
      <div className="container">
      <div>
        <div className="container-fluid">
          
            <h3 className="text-center mt-2">Quản lý Voucher</h3>
            <div className='bg-light m-2 p-3 pt-5' style={{borderRadius:20}}>
            <div className="text-first fw-bold" style={{marginTop:-10}}>
          <FilterFilled/> Bộ lọc
          <hr/>
              </div>
            <Form className=" row col-md-12"
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
        <div className="col-md-4">
      <Form.Item label="Mã Voucher">
        <Input />
      </Form.Item>
      <Form.Item label="Phương thức">
        <Select value={selectedValue} onChange={handleChange}>
          <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
          <Select.Option value="Phần trăm">Phần trăm</Select.Option>
        </Select>
      </Form.Item>
      </div>
      <div className='col-md-4'>
      <Form.Item label="Mức độ">
          {selectedValue==='Tiền mặt'?
      <InputNumber
      defaultValue={0}
      formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
      onChange={onChange}
      style={{width:'100%'}}
    />
    :
    <InputNumber
      defaultValue={0}
      min={0}
      max={100}
      formatter={(value) => `${value}%`}
      parser={(value) => value.replace('%', '')}
      onChange={onChange}
      style={{width:'100%'}}
    />
          }
      </Form.Item>
      <Form.Item label="Giảm tối đa">
      <InputNumber
      defaultValue={0}
      formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
      onChange={onChange}
      style={{width:'100%'}}
    />
      </Form.Item>
      <Form.Item label="Điều kiện">
      <InputNumber
      defaultValue={0}
      formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
      onChange={onChange}
      style={{width:'100%'}}
    />
        
      </Form.Item>
      </div>
      <div className='col-md-4'>
      
      <Form.Item label="Ngày bắt đầu">
      <DatePicker style={{width:'100%'}}/>
      </Form.Item>
      <Form.Item label="Ngày kết thúc">
      <DatePicker style={{width:'100%'}}/>
      </Form.Item>
      </div>
      <div className="col-md-4"></div>
      <div className="col-md-1"></div>
      <div className="col-md-4">
      <Form.Item className='text-center'>
      <Button type="primary">Thêm</Button>
      </Form.Item>
      </div>
    </Form>
    </div>
     {/* hết form Voucher */}
     <br/>
     <div className="text-first fw-bold">
            <p><UnorderedListOutlined /> Danh sách khuyến mại</p>
          </div>
           <hr/>
     <>
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={hasData ? voucher : []}
        scroll={scroll}
      />
    </>
        </div>
</div>
</div>
      </div> 
          

    );
}
export default Voucher;